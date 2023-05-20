import { useEffect } from "react";
import { memo } from "react";


const PDFFile = (props) => {

  console.log("Link: "+ props.linkPdf + " " + props.role)

    return (
        <iframe key= {new Date()}
          src = {`${props.linkPdf}/${props.roomId}?roomId=${props.roomId}`}
          title="pdfframe"
          height="100%"
          width="100%"
        ></iframe>
    );
}

export default memo(PDFFile);