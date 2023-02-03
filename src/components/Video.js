import {JitsiMeeting } from '@jitsi/react-sdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Videocall = (props) => {
  const [name, setName] = useState('');
  useEffect(()=>{
    const getData = async () => {
      const data = await axios.get(`http://localhost:3030/currentInfor`);
      setName(data.data.username);
    };
    getData();
  },[])
  const [position, setPosition] = useState({
    left: "0px",
    top: "0px",
    position: "relative",
    height: "93vh"
  });

  const handleClick = () => {
    setPosition({
      left: "250px",
      top: "150px",
      position: "relative",
      height: "15vh"
    });
  };


  return (
    <>

  {/* <div  style={{
          left: position.left,
          top: position.top,
          position: position.position,
          height: props.height
        }}> */}
  <JitsiMeeting 
    domain = "kltnvirtualclassroom.online"
    // domain = "meet.jit.si"
    roomName = "VirtualClassroom"
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false,
        disableSimulcast: false,
    }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
    }}
  
    
    userInfo = {{
        displayName: name,
        email: 'hellobagia@gnail.com'
    }}
    onApiReady = { (externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
       
    } }
     getIFrameRef = { (iframeRef) => { iframeRef.style.height = "100%" ; } }
  /></>
  )
};

export default Videocall;