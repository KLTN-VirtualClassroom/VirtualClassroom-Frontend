import { useEffect } from "react";

const PDFFile = (props) => {

  console.log("Link: "+ props.linkPdf)
    return (
        <iframe key= {new Date()}
          src = {props.linkPdf}
          title="pdfframe"
          height="100%"
          width="100%"
        ></iframe>
    );
}

export default PDFFile;