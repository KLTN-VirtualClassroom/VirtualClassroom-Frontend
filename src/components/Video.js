import { JitsiMeeting } from "@jitsi/react-sdk";
import config from '../config/config';

import React, { useEffect, useState } from "react";

const Videocall = (props) => {
  const [name, setName] = useState("");
  console.log("CONF " + config.path.VIDEO_PATH)
  // useEffect(()=>{
  //   const getData = async () => {
  //     const data = await axios.get(`http://localhost:3030/currentInfor`);

  //     const data2 = await axios.get(`http://localhost:3030/user/getList`);
  //     console.log(data2)

  //     setName(data.data.username);
  //   };
  //   getData();
  // },[])

  // const [position, setPosition] = useState({
  //   left: "0px",
  //   top: "0px",
  //   position: "relative",
  //   height: "93vh"
  // });

  // const handleClick = () => {
  //   setPosition({
  //     left: "250px",
  //     top: "150px",
  //     position: "relative",
  //     height: "15vh"
  //   });
  // };

  return (
    <>
      <JitsiMeeting
        domain = {config.path.VIDEO_PATH}
        // domain = "meet.jit.si"
        roomName="VirtualClassroom"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          disableSimulcast: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
        }}
        userInfo={{
          displayName: props.name,
          email: "null",
        }}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
          externalApi.addEventListener(
            "participantRoleChanged",
            function (event) {
              if (event.role === "moderator") {
                externalApi.executeCommand("password", "12345678");
              }
            }
          );
          externalApi.on("passwordRequired", function () {
            externalApi.executeCommand("password", "12345678");
          });
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
        }}
      />
    </>
  );
};

export default Videocall;
