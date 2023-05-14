import React, { useEffect, useState } from "react";
import VideoMeet from "../components/Video";
import Navbar from "../components/MenuBar";
import ChatScreen from "../components/ChatScreen";
import PdfScreen from "../components/PdfFile";
import WhiteboardScreen from "../components/WhiteboardScreen";
import ChoosePDF from "../components/ChoosePDF/index.js";
import config from "../config/config";
import io from "socket.io-client";
import axios from "axios";
import { memo } from "react";
import {
  setAccountInfo,
  setAccountStatus,
  setAccountRole,
} from "../redux/slices/accountSlice.js";

import "../Style/App.css";
import { useDispatch } from "react-redux";

const socket = io(config.path.SOCKET_PATH);
// const socket = io("http://localhost:3131");

const video_height = "93vh";
const video_height_material = "30vh";

const chat_height = "93vh";
const chat_height_material = "63vh";

const Meeting = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    roomId: "",
    id: "",
    authToken: ""
  });
  const [screen, setScreen] = useState({ screen: "", linkPdf: "", pdfId: "" });
  const [role, setRole] = useState(userInfo);
  const [isLoading, setLoading] = useState(true);


  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      //const data = await axios.get(`${config.path.SERVER_PATH}/currentInfor`);
      
      let accountInfor = {}

      var params = window.location.href.split("?")[1].split("&");
      //console.log(params)
      var data = {};
      for (let x in params) {
        data[params[x].split("=")[0]] = params[x].split("=")[1];
      }

      // window.addEventListener('message', function(e){
      //   // accountInfor = JSON.parse(e.data)
      //   console.log(e)
      // })
      await axios.post(`${config.path.SERVER_PATH}/getInfor`,data).then((response)=>{
        accountInfor = response.data
      });


      //if (data.data.username !== "") accountInfor = data.data;

      socket?.emit("get-room-info", { roomId: accountInfor.roomId });

      //console.log(accountInfor);
      dispatch(setAccountInfo(accountInfor));
      setUserInfo(accountInfor);
      setRole(accountInfor);
      setLoading(false)
    };
    getData();
  }, []);

  //----------- Socket for first access to room whether the teacher is on material view
  if (userInfo.roomId !== "") {
    socket.on("pdf", (pdf) => {
      if (pdf.pdfStatus === 1) {
        console.log("PDF: "+pdf.pdfId)
        setScreen({
          screen: "material",
          pdfId: pdf.pdfId,
          linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${pdf.pdfId}`,
        });
      }
      if (pdf.pdfStatus === 0)
        setScreen({ screen: "", linkPdf: "", pdfId: "" });
    });
  }

  socket?.on("set-role", (setting) => {
    if (role.role !== "") {
      if (role.role !== "teacher") {
        console.log(setting.role);
        setRole((prev) => {
          return { ...prev, role: setting.role };
        });
        dispatch(setAccountRole(setting.role));
      }
    }
  });


  socket?.on("get-pdf-status", (pdf) => {
    if (pdf.pdfStatus === 1) {
      setScreen({
        screen: "material",
        pdfId: pdf.pdfId,
        linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${screen.pdfId}`,
      });
    }
  });

  // useEffect(() => {
  //   socket?.on("get-pdf-status", (pdf) => {
  //     if (pdf.pdfStatus === 1) {
  //       setScreen({
  //         screen: "material",
  //         pdfId: pdf.pdfId,
  //         linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${screen.pdfId}`,
  //       });
  //     }
  //   });

  //   //-------------- Allow student to annotate pdf file
 
  // }, [socket]);

  const toMaterial = () => {
    setScreen({ screen: "material", pdfId: "", linkPdf: "" });
  };

  const toWhiteboard = () => {
    setScreen({ screen: "whiteboard", pdfId: "", linkPdf: "" });
  };

  const toMain = () => {
    setScreen({ screen: "", pdfId: "", linkPdf: "" });
    socket?.emit("pdf-status", {
      status: 0,
      pdfId: "",
    });
  };

  const setAllow = (checked) => {
    if (userInfo.role === "teacher") {
      if (checked) {
        socket?.emit("allowance", {
          socketId: socket.id,
          role: "student-allow-edit",
        });
      } else {
        socket.emit("allowance", {
          socketId: socket.id,
          role: "student",
        });
      }
    }
  };

  const getPdf = (pdf) => {
    socket?.emit("pdf-status", {
      status: 1,
      pdfId: pdf.id,
      socketId: socket.id,
    });
    setScreen({
      screen: "material",
      pdfId: pdf.id,
      linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${pdf.id}`,
    });
  };

  useEffect(() => {
    setScreen({
      ...screen,
      linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${screen.pdfId}`,
    });
  }, [role]);

  if(isLoading){
    return (<></>)
  }

  if (screen.screen === "") {
    return (
      <div className="container">
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
                id={userInfo.roomId}
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
                id={userInfo.roomId}
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
              <ChoosePDF getPdf={getPdf} userInfo={userInfo} />
            ) : (
              <PdfScreen role={userInfo.role} linkPdf={screen.linkPdf} roomId={userInfo.roomId} />
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
                id={userInfo.roomId}
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

export default memo(Meeting);
