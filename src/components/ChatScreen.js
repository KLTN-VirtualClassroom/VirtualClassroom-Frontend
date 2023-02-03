import { useEffect, useState } from "react";
import axios from "axios";
import "../Style/ChatScreen.css";

const ChatScreen = (props) => {
  const account = props.userInfo;

  const [authToken, setauthToken] = useState("");

  const [position, setPosition] = useState({
    left: "0px",
    top: "0px",
    position: "relative",
  });

  const handleClick = () => {
    setPosition({
      left: "100px",
      top: "100px",
      position: "relative",
    });
  };

  return (
    // <div style={{ height: props.height }}>
    // <div className="chat-confe">

    //   {account.role === "student" ? (
    //     <iframe
    //       src="http://localhost:3000/channel/general?layout=embedded"
    //       title="chatframe"
    //       height={"100%"}
    //     ></iframe>
    //   ) : (
    //     <iframe
    //       src="http://localhost:3000/channel/general"
    //       title="chatframe"
    //       height={"100%"}
    //     ></iframe>
    //   )}
    // </div>

    <>
      <iframe
      title="chat"
      src="http://localhost:3000/channel/general?layout=embedded"
        style={{
          left: position.left,
          top: position.top,
          position: position.position,
          height: "100%"
        }}
      />
    </>
  );
};
export default ChatScreen;
