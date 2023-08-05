import React, { useEffect, useState, useRef } from "react";
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
  setAccountRole,
} from "../redux/slices/accountSlice.js";
import { setStatus, removeStatus } from "../redux/slices/pdfSlice";

import "../Style/App.css";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import NotiDialog from "../components/NotiDialog.js";
import { motion as m } from "framer-motion";
import { Typography } from "@mui/material";
import {
  useGetCourseListMutation,
  useGetTopicListMutation,
  useGetPersonalMaterialMutation,
} from "../assets/materialApi.js";

const socket = io(config.path.SOCKET_PATH);

const video_height = "93vh";
const video_height_material = "30vh";

const chat_height = "93vh";
const chat_height_material = "63vh";

const Meeting = () => {
  // const [userInfo, setUserInfo] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  //   role: "",
  //   roomId: "",
  //   id: "",
  //   authToken: "",
  // });
  const [userInfo, setUserInfo] = useState({});
  const [screen, setScreen] = useState({ screen: "", linkPdf: "", pdfId: "" });
  const [role, setRole] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [redirectLink, setRedirectLink] = useState(null);
  const [openLink, setOpenLink] = useState(false);
  const [getPersonalPdf] = useGetPersonalMaterialMutation();
  const [getPdfCourse] = useGetCourseListMutation();
  const [getPdfTopic] = useGetTopicListMutation();
  const dataFetchedRef = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      console.log("HOW");
      let accountInfor = {};

      var params = window.location.href.split("?")[1].split("&");
      //console.log(params)
      var data = {};
      for (let x in params) {
        data[params[x].split("=")[0]] = params[x].split("=")[1];
      }

      await axios
        .post(`${config.path.SERVER_PATH}/getInfor`, data)
        .then((response) => {
          accountInfor = response.data;
        });

      socket?.emit("get-room-info", {
        roomId: accountInfor.roomId,
        type: "call",
        username: accountInfor.username,
      });

      // const listMaterial = await getPersonalPdf(userInfo.id);
      // const listCourse = await getPdfCourse();
      // const listTopic = await getPdfTopic();

      console.log(data.topicId);
      dispatch(setAccountInfo(accountInfor));
      await setUserInfo(accountInfor);
      await setRole(accountInfor);

      if (data.topicId === "undefined" || data.topicId === undefined)
        console.log("done");
      else {
        await axios
          .get(`${config.path.SERVER_PATH}/topic/getTopicById`, {
            topicId: data.topicId,
          })
          .then((response) => {
            // console.log("FILDE " + response.data[0].fileId);
            getPdf({ id: response.data[0].fileId });
          });
      }
      const listMaterial = await getPersonalPdf("6nJHajizdabLz9xrr");
      const listCourse = await getPdfCourse();
      const listTopic = await getPdfTopic();
      setLoading(false);
    };
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getData();
  }, []);

  // useEffect(() => {
  //   if (openLink === 0 && redirectLink !== null) window.open(redirectLink, "_blank", "noreferrer");
  //   setOpenLink(1);
  // }, [redirectLink]);

  //----------- Socket for first access to room whether the teacher is on material view
  socket?.on("pdf", (pdf) => {
    if (pdf.pdfStatus === 1) {
      //console.log("PDF: " + pdf.pdfId);
      setScreen({
        screen: "material",
        pdfId: pdf.pdfId,
        linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${pdf.pdfId}`,
      });
    }
    if (pdf.pdfStatus === 0 && redirectLink === null)
      setScreen({ screen: "", linkPdf: "", pdfId: "" });
    if (role.role !== "teacher") {
      //console.log(setting.role);
      setRole((prev) => {
        return { ...prev, role: "student" };
      });
    }
  });

  //----------- Socket for first access to room whether the teacher is allow edit pdf
  socket?.on("set-role", (setting) => {
    if (role.role !== "" && role.role !== undefined) {
      if (role.role !== "teacher") {
        //console.log(setting.role);
        setRole((prev) => {
          return { ...prev, role: setting.role };
        });
        dispatch(setAccountRole(setting.role));
      }
    }
  });

  //----------- Socket for check teacher access a pdf file
  socket?.on("get-pdf-status", async (pdf) => {
    if (pdf.pdfStatus === 1) {
      await setScreen({
        screen: "material",
        pdfId: pdf.pdfId,
        linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${pdf.pdfId}`,
      });
    }
  });

  //--------Socket for check redirect meet
  socket?.once("redirect-meeting", (link) => {
    if (link.linkMeeting) {
      console.log("Link la: " + link.linkMeeting);
      // if(openLink === 0)
      // window.open(link.linkMeeting, "_blank", "noreferrer")
      setOpenLink(true);
      setRedirectLink(link.linkMeeting);
      setScreen({ screen: "whiteboard", pdfId: "", linkPdf: "" });
    }
  });

  socket?.on("cancel-redirect-meeting", (data) => {
    console.log("cancel");
    setRedirectLink(null);
    setOpenLink(0);
  });

  const toMaterial = () => {
    // setScreen({ screen: "material", pdfId: "", linkPdf: "" });
    setScreen({
      screen: "material",
      pdfId: screen.pdfId,
      linkPdf: screen.linkPdf,
    });
  };

  const toListMaterial = () => {
    setScreen({ screen: "material", pdfId: "", linkPdf: "" });
    // setScreen({ screen: "material", pdfId: screen.pdfId, linkPdf: screen.linkPdf });
  };

  const toWhiteboard = () => {
    setScreen({
      screen: "whiteboard",
      pdfId: screen.pdfId,
      linkPdf: screen.linkPdf,
    });
  };

  const toMain = () => {
    setScreen({ screen: "", pdfId: "", linkPdf: "" });
    socket?.emit("pdf-status", {
      status: 0,
      pdfId: "",
    });
  };

  const toFullVideo = () => {
    setScreen({ screen: "", pdfId: screen.pdfId, linkPdf: screen.linkPdf });
  };

  const setAllow = (checked) => {
    if (userInfo.role === "teacher") {
      if (checked) {
        socket?.emit("allowance", {
          role: "student-allow-edit",
        });
      } else {
        socket.emit("allowance", {
          role: "student",
        });
      }
    }
  };

  const getPdf = (pdf) => {
    axios
      .post(
        `${config.path.SERVER_PATH}/materialstatistic/addMaterialStatistic`,
        { fileId: pdf.id, dateAccess: new Date() }
      )
      .then(function (response) {
        console.log("HJHHHH");
      });

    socket?.emit("pdf-status", {
      status: 1,
      pdfId: pdf.id,
      socketId: socket.id,
    });
    dispatch(
      setStatus({
        pdfLink: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${pdf.id}`,
      })
    );
    setScreen({
      screen: "material",
      pdfId: pdf.id,
      linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${pdf.id}`,
    });
  };

  const redirectMeeting = (link) => {
    socket?.emit("create-redirect-meeting", {
      linkMeeting: link,
    });
    setRedirectLink(link);

    setScreen({ screen: "whiteboard", pdfId: "", linkPdf: "" });
  };

  const returnMeeting = () => {
    setRedirectLink(null);
    socket?.emit("remove-redirect-meeting", { message: "Hello" });
    if (screen.screen === "whiteboard") toMain();
  };

  const handleCloseDialog = () => {
    setOpenLink(false);
  };
  const handleRedirectMeeting = () => {
    window.open(redirectLink);
    setOpenLink(false);
  };

  useEffect(() => {
    setScreen({
      ...screen,
      linkPdf: `${config.path.PSPDFKIT_UI_PATH}/documents/${role.role}/${screen.pdfId}`,
    });
  }, [role]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 40 }}>
        <CircularProgress></CircularProgress>
      </Box>
    );
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
          screen={screen.screen}
          role={userInfo.role}
        />
        <div className="no">
          <div className="row-container">
            {/* {screen.pdfId && (
              <Box sx={{ position: "absolute", left: "5px", top: "8vh" }}>
              <Fab size="small" onClick={toMaterial}>
                <ZoomInMapIcon />
              </Fab>
            </Box>
            )} */}
            {redirectLink ? (
              <Box
                className="row-video-container"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,.2)), url('https://cdn.pixabay.com/photo/2019/11/06/11/16/page-4605867_1280.png')",
                  backgroundPosition: "center center",
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `100% 100%`,
                }}
              >
                {userInfo.role === "teacher" ? (
                  <Box
                    onClick={returnMeeting}
                    sx={{
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "1.5rem",
                      color: "blue",
                    }}
                  >
                    Return to Meeting Call{" "}
                  </Box>
                ) : (
                  <Typography>Video is delaying</Typography>
                )}
              </Box>
            ) : (
              <div className="row-video-container">
                <VideoMeet
                  height={video_height_material}
                  name={userInfo.username}
                  id={userInfo.roomId}
                  screen={screen.screen}
                  pdfId={screen.pdfId}
                  toFullVideo={toFullVideo}
                  toMaterial={toMaterial}
                />
              </div>
            )}
            <div className="row-chat-container">
              <ChatScreen
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                exit={{ opacity: 1 }}
                height={chat_height_material}
                userInfo={userInfo}
              ></ChatScreen>
            </div>
          </div>
        </div>
        <NotiDialog
          open={openLink}
          handleChangeMeeting={handleRedirectMeeting}
          handleClose={handleCloseDialog}
        />
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
          getClickedListMaterial={toListMaterial}
          getClickedAllow={setAllow}
          userInfo={userInfo}
          screen={screen.screen}
          role={userInfo.role}
          pdfOpen={screen.pdfId}
        />
        <div className="virtual">
          <div className="col-container">
            {/* <Box sx={{ position: "absolute", right: "5px", top: "8vh" }}>
              <Fab size="small" onClick={toFullVideo}>
                <ZoomOutMapIcon />
              </Fab>
            </Box> */}
            {redirectLink ? (
              <Box
                className="col-video-container"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,.2)), url('https://cdn.pixabay.com/photo/2019/11/06/11/16/page-4605867_1280.png')",
                  backgroundPosition: "center center",
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `100% 100%`,
                }}
              >
                {userInfo.role === "teacher" ? (
                  <Typography
                    onClick={returnMeeting}
                    sx={{ cursor: "pointer", color: "blue", fontWeight: "500" }}
                  >
                    Return to Meeting Call{" "}
                  </Typography>
                ) : (
                  <Typography>Video is delaying</Typography>
                )}
              </Box>
            ) : (
              <div className="col-video-container">
                <VideoMeet
                  height={video_height_material}
                  name={userInfo.username}
                  id={userInfo.roomId}
                  screen={screen.screen}
                  pdfId={screen.pdfId}
                  toFullVideo={toFullVideo}
                />
              </div>
            )}
            <div className="col-chat-container">
              <ChatScreen
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                exit={{ opacity: 1 }}
                height={chat_height_material}
                userInfo={userInfo}
              ></ChatScreen>
            </div>
          </div>
          <div className="third-container">
            {screen.pdfId === "" ? (
              <ChoosePDF getPdf={getPdf} userInfo={userInfo} />
            ) : (
              <PdfScreen
                role={userInfo.role}
                linkPdf={screen.linkPdf}
                roomId={userInfo.roomId}
                returnPage={toListMaterial}
              />
            )}
          </div>
        </div>
        <NotiDialog
          open={openLink}
          handleChangeMeeting={handleRedirectMeeting}
          handleClose={handleCloseDialog}
        />
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
          getClickedClose={toFullVideo}
          userInfo={userInfo}
          screen={screen.screen}
          role={userInfo.role}
        />
        <div className="virtual">
          <div className="col-container">
            {/* <Box sx={{ position: "absolute", right: "5px", top: "8vh" }}>
              <Fab size="small" onClick={toFullVideo}>
                <ZoomOutMapIcon />
              </Fab>
            </Box> */}
            {redirectLink ? (
              <Box
                className="col-video-container"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,.2)), url('https://cdn.pixabay.com/photo/2019/11/06/11/16/page-4605867_1280.png')",
                  backgroundPosition: "center center",
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `100% 100%`,
                }}
              >
                {userInfo.role === "teacher" ? (
                  <Typography
                    onClick={returnMeeting}
                    sx={{ cursor: "pointer", color: "blue", fontWeight: "500" }}
                  >
                    Return to Meeting Call{" "}
                  </Typography>
                ) : (
                  <Typography>Video is delaying</Typography>
                )}
              </Box>
            ) : (
              <div className="col-video-container">
                <VideoMeet
                  height={video_height_material}
                  name={userInfo.username}
                  id={userInfo.roomId}
                  screen={screen.screen}
                  pdfId={screen.pdfId}
                  toFullVideo={toFullVideo}
                />
              </div>
            )}
            <div className="col-chat-container">
              <ChatScreen
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                exit={{ opacity: 1 }}
                height={chat_height_material}
                userInfo={userInfo}
              ></ChatScreen>
            </div>
          </div>
          <div className="third-container">
            <WhiteboardScreen
              userInfo={userInfo}
              linkNewMeeting={redirectLink}
              redirectMeeting={redirectMeeting}
              role={userInfo.role}
              returnMeeting={returnMeeting}
            />
          </div>
        </div>
        <NotiDialog
          open={openLink}
          handleChangeMeeting={handleRedirectMeeting}
          handleClose={handleCloseDialog}
        />
      </div>
    );
  }
};

export default memo(Meeting);
