import React, { useState } from "react";
import VideoMeet from "./components/Video";
import Navbar from "./components/MenuBar";
import ChatScreen from "./components/ChatScreen";
import PdfScreen from "./components/PdfFile"
import WhiteboardScreen from "./components/WhiteboardScreen"
import "./Style/App.css";

const App = () => {
  const [screen, setScreen] = useState("");

  const toMaterial = ()=>{setScreen("material")};
  const toWhiteboard = ()=>{setScreen("whiteboard")}

  const video_height = "93vh";
  const video_height_material = "30vh"
  
  const chat_height = "93vh";
  const chat_height_material = "63vh"


  // const userInfo = {
  //   username: "NghiaNguyen",
  //   password: "12345678",
  //   email: "",
  //   role: "student"
  // }
  const userInfo = {
    username: "",
    password: "",
    email: "",
    role: "student"
  }



  if (screen === "") {
    return (
      <div>
        <Navbar getClickedMaterial = {toMaterial} getClickedWhiteboard = {toWhiteboard} />
        <div className="row-container">
          <div className="row-video-container">
            <VideoMeet height={video_height} name={userInfo.username}/>
          </div>
          <div className="row-chat-container">
            <ChatScreen height={chat_height} userInfo={userInfo}></ChatScreen>
          </div>
        </div>
      </div>
    );
  } 
  
  if(screen === "material") {
    return (
      <div>
        <Navbar getClickedMaterial = {toMaterial} getClickedWhiteboard = {toWhiteboard}/>
        <div className="virtual">
          <div className="col-container">
            <div className="col-video-container">
              <VideoMeet height={video_height_material} name={userInfo.username}/>
            </div>
            <div className="col-chat-container">
              <ChatScreen height={chat_height_material} userInfo={userInfo}></ChatScreen>
            </div>
          </div>
          <PdfScreen />
        </div>
      </div>
    );
  }

  if(screen === "whiteboard") {
    return (
      <div>
        <Navbar getClickedMaterial = {toMaterial} getClickedWhiteboard = {toWhiteboard}/>
        <div className="virtual">
          <div className="col-container">
            <div className="col-video-container">
              <VideoMeet height={video_height_material}  name={userInfo.username}/>
            </div>
            <div className="col-chat-container">
              <ChatScreen height={chat_height_material} userInfo={userInfo}></ChatScreen>
            </div>
          </div>
          <WhiteboardScreen />
        </div>
      </div>
    );
  }


};

export default App;

 // <div className="virtual">
      //   <div className="container">
      //     <Navbar />
      //     <VideoMeet />
      //   </div>
      //   <div>
      //     <ChatScreen></ChatScreen>
      //   </div>
      // </div>

      // <div>
      //   <Navbar />
      //   <div className="row-container">
      //     <div className="row-video-container">
      //       <VideoMeet />
      //     </div>
      //     <div className="row-chat-container">
      //       <ChatScreen></ChatScreen>
      //     </div>
      //   </div>
      // </div>
