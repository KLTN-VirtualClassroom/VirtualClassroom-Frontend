import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useRef, useState } from "react";
import { ResizableBox } from "react-resizable";

const App = () => {
  const [iframeHeight, setiframeHeight] = useState(1000);
  console.log(iframeHeight);
  return (
    <>
      <div>
        <input
          id="navbar-indicator"
          className="navbar-collapse"
        />

        <nav class="navbar">
          <a class="navbar-brand" href="/">
            VirtualClassroom
          </a>

          <div className="navbar-left">
            <a
              className="nav-link"
              href="#/"
              onClick={() => {
                setiframeHeight(1200);
              }}
            >
              Material
            </a>
            <button
              className="btn_size"
              onClick={() => {
                setiframeHeight("33vh");
              }}
            >
              Whiteboard
            </button>
          </div>

          <div className="navbar-right">
            <a className="button1" href="/">
              <span className="nav-link">Copy Link</span>
            </a>

            <label className="navbar-toggler" htmlFor="navbar-indicator">
              +
            </label>
            {/* <a className="nav-link" href="#">Copy link</a> */}
          </div>
        </nav>
      </div>
      <ResizableBox width={iframeHeight} height={1000}>
        <JitsiMeeting
          domain="kltnvirtualclassroom.online"
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
            displayName: "HungNguyen",
          }}
          onApiReady={(externalApi) => {}}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "93vh";
          }}
        />
      </ResizableBox>
    </>
  );
};

export default App;
