import { useEffect, useState } from "react";
import axios from "axios";
const ChatScreen = (props) => {
  const account = props.userInfo;

  const [authToken, setauthToken] = useState("");

  // useEffect(() => {
  //   async function getAuth() {
  //     await axios.post("http://localhost:3030/getInfor", account);
  //   }

  //   getAuth();
  //   //localStorage.clear();
  //   const status = "done";
  //   setauthToken(status);
  //   console.log("Token:");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authToken]);

  return (
    <div style={{ height: props.height }}>
      {account.role === "student" ? (
        <iframe
          src="http://localhost:3000/channel/general?layout=embedded"
          title="chatframe"
          height={"100%"}
        ></iframe>
      ) : (
        <iframe
          src="http://localhost:3000/channel/general"
          title="chatframe"
          height={"100%"}
        ></iframe>
      )}
    </div>
  );
};
export default ChatScreen;
