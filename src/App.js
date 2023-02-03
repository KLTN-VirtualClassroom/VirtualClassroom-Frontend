import React, { useEffect, useState } from "react";
import VideoMeet from "./components/Video";
import Navbar from "./components/MenuBar";
import ChatScreen from "./components/ChatScreen";
import PdfScreen from "./components/PdfFile";
import WhiteboardScreen from "./components/WhiteboardScreen";
import ChoosePDF from "./components/ChoosePDF";
import io from "socket.io-client";
import { Resizable } from "react-resizable";

import "./Style/App.css";

const socket = io("http://localhost:3030");

const userInfo = {
  username: "",
  password: "",
  email: "",
  role: "teacher",
};

const video_height = "93vh";
const video_height_material = "30vh";

const chat_height = "93vh";
const chat_height_material = "63vh";

const App = () => {
  const [screen, setScreen] = useState({ screen: "", linkPdf: "", pdfId: "" });
  const [role, setRole] = useState(userInfo);
  const [pdfId, setPdfId] = useState("");
  const [linkPdf, setLinkPdf] = useState(
    `http://localhost:3303/documents/${role.role}/`
  );

  //----------- Socket for first access to room whether the teacher is on material view
  socket.on("pdf", (pdf) => {
    if (pdf.pdfStatus === 1) {
      //setLinkPdf(`http://localhost:3303/documents/${role.role}/${pdf.id}`);
      console.log(pdf);
      setScreen({
        screen: "material",
        pdfId: pdf.pdfId,
        linkPdf: `http://localhost:3303/documents/${role.role}/${pdf.pdfId}`,
      });

      console.log("idss1 " + pdfId);
    }
    if (pdf.pdfStatus === 0) setScreen({ screen: "", linkPdf: "", pdfId: "" });
  });

  //----------- Socket check if teacher is to material, all other to material too

  socket.on("get-pdf-status", (pdf) => {
    console.log(pdf)
    if (pdf.pdfStatus === 1) {
      console.log("idss2 " + pdf.pdfId);

      setScreen({
        screen: "material",
        pdfId: pdf.pdfId,
        linkPdf: `http://localhost:3303/documents/${role.role}/${pdf.pdfId}`,
      });
      console.log("idss2 " + pdf.pdfId);
    } else console.log("idss8" + pdf.pdfStatus);
  });

  //-------------- Allow student to annotate pdf file
  socket.on("set-role", (setting) => {
    if (role !== setting.role && setting.socketId !== socket.id)
      setRole((prev) => {
        return { ...prev, role: setting.role };
      });
  });

  const toMaterial = () => {
    setScreen({ screen: "material", pdfId: "", linkPdf: "" });
    // socket.emit("pdf-status", {
    //   status: 1,
    //   pdfId: "7KPTMJA1RKY55Q7Q72KXNMB288",
    // });
  };

  const toWhiteboard = () => {
    setScreen("whiteboard");
  };

  const toMain = () => {
    setScreen("");
    socket.emit("pdf-status", {
      status: 0,
      pdfId: "",
    });
  };

  const setAllow = () => {
    console.log("SENDED" + userInfo.role);
    if (userInfo.role === "teacher") {
      socket.emit("allowance", {
        socketId: socket.id,
        role: "student",
      });
    }
  };

  const getPdf = (pdf) => {
    console.log(pdf);
    socket.emit("pdf-status", {
      status: 1,
      pdfId: pdf.id,
      socketId: socket.id,
    });
    setScreen({
      screen: "material",
      pdfId: pdf.id,
      linkPdf: `http://localhost:3303/documents/${role.role}/${pdf.id}`,
    });
    //setLinkPdf(`http://localhost:3303/documents/${role.role}/${pdf.id}`);
  };

  useEffect(() => {
    setScreen({...screen, linkPdf: `http://localhost:3303/documents/${role.role}/${screen.pdfId}`});
  }, [role]);

  // useEffect(() => {
  //   setLinkPdf(
  //     `http://localhost:3303/documents/${role.role}/${pdfId}`
  //   );
  // }, [pdfId]);

  console.log("Link " + linkPdf);

  if (screen.screen === "") {
    return (
      <div>
        <Navbar
          getClickedMaterial={toMaterial}
          getClickedWhiteboard={toWhiteboard}
          getClickedMain={toMain}
          getClickedAllow={setAllow}
        />
        <div className="no">
          <div className="row-container">
            <div className="row-video-container">
              <VideoMeet
                height={video_height_material}
                name={userInfo.username}
              />
            </div>
            <div className="row-chat-container">
              <ChatScreen
                height={chat_height_material}
                userInfo={userInfo}
              ></ChatScreen>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen.screen === "material") {
    return (
      <div>
        <Navbar
          getClickedMaterial={toMaterial}
          getClickedWhiteboard={toWhiteboard}
          getClickedMain={toMain}
          getClickedAllow={setAllow}
        />
        <div className="virtual">
          <div className="col-container">
            <div className="col-video-container">
              <VideoMeet
                height={video_height_material}
                name={userInfo.username}
              />
            </div>
            <div className="col-chat-container">
              <ChatScreen
                height={chat_height_material}
                userInfo={userInfo}
              ></ChatScreen>
            </div>
          </div>
          <div className="third-container">
            {screen.pdfId === "" ? (
              <ChoosePDF getPdf={getPdf} />
            ) : (
              <PdfScreen role={userInfo.role} linkPdf={screen.linkPdf} />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen.screen === "whiteboard") {
    return (
      <div>
        <Navbar
          getClickedMaterial={toMaterial}
          getClickedWhiteboard={toWhiteboard}
          getClickedMain={toMain}
        />
        <div className="virtual">
          <div className="col-container">
            <div className="col-video-container">
              <VideoMeet
                height={video_height_material}
                name={userInfo.username}
              />
            </div>
            <div className="col-chat-container">
              <ChatScreen
                height={chat_height_material}
                userInfo={userInfo}
              ></ChatScreen>
            </div>
          </div>
          <div className="third-container">
            <WhiteboardScreen />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
