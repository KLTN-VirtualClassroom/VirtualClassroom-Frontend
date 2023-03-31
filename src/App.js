import React, { useEffect, useState } from "react";
import VideoMeet from "./components/Video";
import Navbar from "./components/MenuBar";
import ChatScreen from "./components/ChatScreen";
import PdfScreen from "./components/PdfFile";
import WhiteboardScreen from "./components/WhiteboardScreen";
import ChoosePDF from "./components/ChoosePDF";
import io from "socket.io-client";
import axios from "axios";
import { Resizable } from "react-resizable";

import "./Style/App.css";

const socket = io("http://localhost:3030");

const userInfo2 = {
  username: "",
  password: "",
  email: "",
  role: "",
  roomId: "",
};

const video_height = "93vh";
const video_height_material = "30vh";

const chat_height = "93vh";
const chat_height_material = "63vh";

const App = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    roomId: "",
    id: ""
  });
  const [screen, setScreen] = useState({ screen: "", linkPdf: "", pdfId: "" });

  const [role, setRole] = useState(userInfo);


  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`http://localhost:3030/currentInfor`);
      console.log(data.data)
      setUserInfo(data.data);
      setRole(data.data);
    };
    getData();
  }, []);

  //----------- Socket for first access to room whether the teacher is on material view
  socket.on("pdf", (pdf) => {
    if (pdf.pdfStatus === 1) {
      setScreen({
        screen: "material",
        pdfId: pdf.pdfId,
        linkPdf: `http://18.139.222.211/documents/${role.role}/${screen.pdfId}`,

      });
    }
    if (pdf.pdfStatus === 0) setScreen({ screen: "", linkPdf: "", pdfId: "" });
  });

  //----------- Socket check if teacher is to material, all other to material too

  socket.on("get-pdf-status", (pdf) => {
    if (pdf.pdfStatus === 1) {
      setScreen({
        screen: "material",
        pdfId: pdf.pdfId,
        linkPdf: `http://18.139.222.211/documents/${role.role}/${screen.pdfId}`,

      });
    } 
  });

  //-------------- Allow student to annotate pdf file
  socket.on("set-role", (setting) => {
    if(role.role !== ""){
    if (role.role !== "teacher")
      setRole((prev) => {
        return { ...prev, role: setting.role };
      });
    }
  });

  const toMaterial = () => {
    setScreen({ screen: "material", pdfId: "", linkPdf: "" });
  };

  const toWhiteboard = () => {
    setScreen({ screen: "whiteboard", pdfId: "", linkPdf: "" });
  };

  const toMain = () => {
    setScreen({ screen: "", pdfId: "", linkPdf: "" });
    socket.emit("pdf-status", {
      status: 0,
      pdfId: "",
    });
  };

  const setAllow = (checked) => {
    if (userInfo.role === "teacher") {
      if (checked) {
        socket.emit("allowance", {
          socketId: socket.id,
          role: "student-allow-edit",
        });
      }
      else{
        socket.emit("allowance", {
          socketId: socket.id,
          role: "student",
        });
      }
    }
  };

  const getPdf = (pdf) => {
    socket.emit("pdf-status", {
      status: 1,
      pdfId: pdf.id,
      socketId: socket.id,
    });
    setScreen({
      screen: "material",
      pdfId: pdf.id,
      // linkPdf: `http://localhost:3303/documents/${role.role}/${pdf.id}`,
      linkPdf: `http://18.139.222.211/documents/${role.role}/${screen.pdfId}`,

    });
  };

  useEffect(() => {
    setScreen({
      ...screen,
      //linkPdf: `http://localhost:3303/documents/${role.role}/${screen.pdfId}`,
      linkPdf: `http://18.139.222.211/documents/${role.role}/${screen.pdfId}`,

    });
  }, [role]);

  if (screen.screen === "") {
    return (
      <div>
        <Navbar
          getClickedMaterial={toMaterial}
          getClickedWhiteboard={toWhiteboard}
          getClickedMain={toMain}
          getClickedAllow={setAllow}
          userInfo={userInfo}
          role={userInfo.role}
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
          userInfo={userInfo}
          role={userInfo.role}
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
          userInfo={userInfo}
          role={userInfo.role}
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
