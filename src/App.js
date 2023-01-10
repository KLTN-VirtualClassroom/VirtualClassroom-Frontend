import React, { useEffect, useState } from "react";
import VideoMeet from "./components/Video";
import Navbar from "./components/MenuBar";
import ChatScreen from "./components/ChatScreen";
import PdfScreen from "./components/PdfFile";
import WhiteboardScreen from "./components/WhiteboardScreen";
import io from "socket.io-client";

import "./Style/App.css";

const socket = io("http://localhost:3030");

const App = () => {
  const [screen, setScreen] = useState("");

  // useEffect(() =>{

  // })

  socket.on("pdf", (pdf) => {
    console.log(pdf);
    if (pdf.pdfStatus === 1) setScreen("material");
    if (pdf.pdfStatus === 0) setScreen("");
  });

  socket.on("get-pdf-status", (status) => {
    if (status === 1) setScreen("material");
  });

  const toMaterial = () => {
    setScreen("material");
    socket.emit("pdf-status", {
      status: 1,
      pdfId: "7KPSMNDRYJ28RV5P2N73BWQZKP",
    });
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

  const video_height = "93vh";
  const video_height_material = "30vh";

  const chat_height = "93vh";
  const chat_height_material = "63vh";

  const userInfo = {
    username: "",
    password: "",
    email: "",
    role: "student",
  };

  if (screen === "") {
    return (
      <div>
        <Navbar
          getClickedMaterial={toMaterial}
          getClickedWhiteboard={toWhiteboard}
          getClickedMain={toMain}
        />
        <div className="row-container">
          <div className="row-video-container">
            <VideoMeet height={video_height} name={userInfo.username} />
          </div>
          <div className="row-chat-container">
            <ChatScreen height={chat_height} userInfo={userInfo}></ChatScreen>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "material") {
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
          <PdfScreen />
        </div>
      </div>
    );
  }

  if (screen === "whiteboard") {
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
          <WhiteboardScreen />
        </div>
      </div>
    );
  }
};

export default App;
