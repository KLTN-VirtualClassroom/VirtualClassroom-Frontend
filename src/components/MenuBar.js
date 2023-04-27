import "../Style/navbar.css";
import { Switch, Typography } from "antd";
import { useReactMediaRecorder } from "react-media-recorder";
import { useState, useEffect } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from "@mui/system";
import { IconButton, Button } from "@mui/material";
import {memo} from "react"

const StyledPlayIcon = styled(PlayArrowIcon, {
  name: "StyledPlayIcon",
  slot: "Wrapper",
})({
  color: "black",
  "&:hover": { color: "gray" },
});

function MenuBar(props) {
  //const navigate = useNavigate();
  const {
    status,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true, audio: true });
  const [recordStatus, setRecordStatus] = useState(null);
  const [toogleMenu, setToogleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const startRecord = async () => {
    await startRecording();
    // if (status === "recording") setRecordStatus("recording");
  };

  const pauseRecord = async () => {
    await pauseRecording();
    console.log(status);

    //setRecordStatus("pausing");
  };

  const resumeRecord = async () => {
    await resumeRecording();
    console.log(status);

    //setRecordStatus("recording");
  };

  const stopRecord = async () => {
    console.log(mediaBlobUrl);
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());

    const url = window.URL.createObjectURL(audioBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `video.mp4`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    //setRecordStatus(null);
  };

  const toogleClicked = () => {
    setToogleMenu(!toogleMenu);
  };
  useEffect(() => {
    if (mediaBlobUrl !== undefined) stopRecord();
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (status === "recording" || status === "paused") setRecordStatus(status);
    if (status === "stopped") setRecordStatus(null);
  }, [status]);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
  }, []);

  return (
    <div>
      <input
        id="navbar-indicator"
        className="navbar-collapse"
        onClick={toogleClicked}
      />

      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-brand" onClick={props.getClickedMain}>
            VirtualClassroom
          </div>
          {(toogleMenu || screenWidth > 842) && (
            <>
              {props.role === "teacher" ? (
                <div className="navbar-animate">
                  <div className="nav-link" onClick={props.getClickedMaterial}>
                    Material
                  </div>
                  <div
                    className="nav-link"
                    onClick={props.getClickedWhiteboard}
                  >
                    Whiteboard
                  </div>
                  <div className="nav-link">
                    <Switch
                      defaultChecked={false}
                      unCheckedChildren="Disallow Student"
                      checkedChildren="Allow Student"
                      onChange={(checked) => props.getClickedAllow(checked)}
                    ></Switch>
                  </div>
                  {/* {recordStatus === "recording" ? (
                    <div className="nav-link">
                      <div className="navbar-record">
                        <Typography className="blob red" />
                        <Typography>Recording</Typography>
                        <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                          <PauseIcon
                            style={{ color: "black" }}
                            fontSize="small"
                            onClick={pauseRecord}
                          />
                        </IconButton>
                        <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                          <StopIcon
                            style={{ color: "black" }}
                            fontSize="small"
                            onClick={stopRecording}
                          />
                        </IconButton>
                      </div>
                    </div>
                  ) : (
                    <div className="nav-link">
                      {recordStatus === "paused" ? (
                        <div className="nav-link">
                          <div className="navbar-record">
                            <Typography className="blob orange" />
                            <Typography>Pausing</Typography>
                            <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                              <PlayArrowIcon
                                style={{ color: "black" }}
                                fontSize="small"
                                onClick={resumeRecord}
                              />
                            </IconButton>
                            <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                              <StopIcon
                                style={{ color: "black" }}
                                fontSize="small"
                                onClick={stopRecording}
                              />
                            </IconButton>
                          </div>
                        </div>
                      ) : (
                        <div className="nav-link" onClick={startRecord}>
                          Record
                        </div>
                      )}
                    </div>
                  )} */}

                  {screenWidth <= 842 && (
                    <div
                      className="nav-link"
                      style={{ color: "red" }}
                      onClick="history.back()"
                    >
                      End Meeting
                    </div>
                  )}
                </div>
              ) : (
                <div className="navbar-animate">
                  <div className="nav-link" onClick={props.getClickedMaterial}>
                    Material
                  </div>
                  <div
                    className="nav-link"
                    onClick={props.getClickedWhiteboard}
                  >
                    Whiteboard
                  </div>
                  <div className="nav-link">
                    <Switch
                      defaultChecked={false}
                      unCheckedChildren="Disallow Student"
                      checkedChildren="Allow Student"
                      onChange={(checked) => props.getClickedAllow(checked)}
                    ></Switch>
                  </div>
{/* 
                  {recordStatus === "recording" ? (
                    <div className="nav-link">
                      <div className="navbar-record">
                        <Typography className="blob red" />
                        <Typography>Recording</Typography>
                        <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                          <PauseIcon
                            style={{ color: "black" }}
                            fontSize="small"
                            onClick={pauseRecord}
                          />
                        </IconButton>
                        <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                          <StopIcon
                            style={{ color: "black" }}
                            fontSize="small"
                            onClick={stopRecording}
                          />
                        </IconButton>
                      </div>
                    </div>
                  ) : (
                    <div className="nav-link">
                      {recordStatus === "paused" ? (
                        <div className="navbar-record">
                          <Typography className="blob orange" />
                          <Typography>Pausing</Typography>
                          <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                            <PlayArrowIcon
                              style={{ color: "black" }}
                              fontSize="small"
                              onClick={resumeRecord}
                            />
                          </IconButton>
                          <IconButton sx={{ marginLeft: 1, padding: 0 }}>
                            <StopIcon
                              style={{ color: "black" }}
                              fontSize="small"
                              onClick={stopRecording}
                            />
                          </IconButton>
                        </div>
                      ) : (
                        <div onClick={startRecord}>Record</div>
                      )}
                    </div>
                  )}
                  {screenWidth <= 842 && (
                    <div
                      className="nav-link"
                      style={{ color: "red", fontWeight: "bold" }}
                      onClick="history.back()"
                    >
                      End Meeting
                    </div>
                  )} */}
                </div>
              )}
            </>
          )}

          {/* {recordStatus === "recording" ? (
            <>
              <div className="navbar-record">
                <Typography className="blob red" />
                <Typography>Recording</Typography>
                <IconButton style={{ marginLeft: 5 }}>
                  <PauseIcon
                    style={{ color: "black" }}
                    fontSize="small"
                    onClick={pauseRecord}
                  />
                </IconButton>
                <IconButton>
                  <StopIcon
                    style={{ color: "black" }}
                    fontSize="small"
                    onClick={stopRecord}
                  />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              {recordStatus === "paused" ? (
                <>
                  <div className="navbar-record">
                    <Typography className="blob orange" />
                    <Typography>Pausing</Typography>
                    <IconButton style={{ marginLeft: 5 }}>
                      <PlayArrowIcon
                        style={{ color: "black" }}
                        fontSize="small"
                        onClick={resumeRecord}
                      />
                    </IconButton>
                    <IconButton>
                      <StopIcon
                        style={{ color: "black" }}
                        fontSize="small"
                        onClick={stopRecord}
                      />
                    </IconButton>
                  </div>
                </>
              ) : (
                <div className="nav-link" onClick={startRecord}>
                  Record
                </div>
              )}
            </>
          )} */}
        </div>

        <div className="navbar-right">
          {/* <div className="nav-link-end" onClick="history.back()"> */}
          {screenWidth > 842 && (
            <Button
              sx={{
                marginRight: 1,
                color: "red",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#f2f2f2" },
              }}
            >
              END MEETING
            </Button>
          )}

          <div>
            <label className="navbar-toggler" htmlFor="navbar-indicator">
              <MoreHorizIcon/>
            </label>
          </div>
          {/* <a class="nav-link" href="#">Copy link</a> */}
        </div>
      </nav>
    </div>
  );
}

export default memo(MenuBar);
