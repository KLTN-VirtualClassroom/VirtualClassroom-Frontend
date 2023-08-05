import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../Style/PdfScreen.css";
import { motion as m } from "framer-motion";
import { useSelector } from "react-redux";


import { memo } from "react";

const PDFFile = (props) => {
  //console.log("Link: " + props.linkPdf + " " + props.role);
  const linkPdf = props.linkPdf.replace("undefined", props.role);
  //console.log("Link2: " + linkPdf);
  const linkPdf2 = useSelector(state => state.pdf);
  console.log(linkPdf2)

  return (
    <Box height={"100%"}>
      <m.iframe
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        key={linkPdf}
        src={`${linkPdf}/${props.roomId}?roomId=${props.roomId}`}
        title="pdfframe"
        height="100%"
        width="100%"
      ></m.iframe>
      {props.role === "teacher" && (
        <ChevronLeftIcon
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
      )}
    </Box>
  );
};

export default memo(PDFFile);
