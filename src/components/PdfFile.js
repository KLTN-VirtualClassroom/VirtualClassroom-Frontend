import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../Style/PdfScreen.css";

import { memo } from "react";
import Tooltip from "@mui/material/Tooltip";

const PDFFile = (props) => {
  console.log("Link: " + props.linkPdf + " " + props.role);
  // const ref = useRef(null);
  // const ref2 = useRef(null);

  // const handleFocus = () => {
  //   console.log("foucs");
  //   ref.current.style.display = "none";
  //   ref2.current.style.display = "flex";
  // };

  // const handleBlur = () => {
  //   console.log("blur");
  //   ref.current.style.display = "flex";
  //   ref2.current.style.display = "none";
  // };

  // useEffect(() => {
  //   ref2.current.style.display = "none";
  // }, []);

  return (
    <Box width={"100%"} height={"100%"}>
      <iframe
        key={new Date()}
        src={`${props.linkPdf}/${props.roomId}?roomId=${props.roomId}`}
        title="pdfframe"
        height="100%"
        width="100%"
      ></iframe>

      {/* <div
        color="transparent"
        ref={ref}
        sx={{
          position: "fixed",
          top: "auto",
          left: "0",
          transform: "translate(-50%,-50%)",
          zIndex: "999"
        }}
        onMouseEnter={handleFocus}
        //onMouseLeave={handleBlur}
        // onClick={props.returnPage}
      >
      </div> */}
     
        <ChevronLeftIcon
          //ref={ref}
          //fontSize="large"
          className="icon"
          sx={{
            opacity: "0.2",
            position: "fixed",
            cursor: "pointer",
            margin: "0",
            fontSize: "4rem",
            top: "50%",
            left: "35px",
            bottom: "0",
            right: "0",
            transform: "translate(-50%,-50%)",
            "&:hover": { opacity: "2", color: "blue" },
          }}
          onClick={props.returnPage}
        />

      {/* <KeyboardArrowUpIcon
        ref={ref}
        fontSize="large"
        className="icon"
        sx={{
          opacity: "0.3",
          position: "fixed",
          margin: "auto",
          top: "10",
          left: "0",
          bottom: "0",
          right: "0",
          transform: "translate(-50%,-50%)",
        }}
        onClick={props.returnPage}
      /> */}

      {/* <CloseIcon
        ref={ref2}
        fontSize="large"
        className="icon"
        sx={{
          opacity: "1",
          position: "fixed",
          margin: "auto",
          top: "10",
          left: "0",
          bottom: "10px",
          border: "solid 2px",
          borderRadius: "50%",
          borderColor: "lightblue",
          right: "0",
          transform: "translate(-50%,-50%)",
        }}
        onMouseLeave={handleBlur}
        onClick={props.returnPage}
      /> */}

      {/* <Fab
        color="transparent"
        ref={ref2}
        sx={{
          margin: "auto",
          top: "auto",
          right: 0,
          bottom: 10,
          left: 0,
          position: "fixed",
        }}
        onMouseLeave={handleBlur}
        onClick={props.returnPage}
      >
        <CloseIcon className="icon" sx={{ display: "flex" }} />
      </Fab> */}
    </Box>
  );
};

export default memo(PDFFile);
