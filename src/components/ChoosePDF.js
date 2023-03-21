import axios from "axios";
import { useState } from "react";
import "../Style/ChoosePdf.css";

// const pdfFile = [
//     {
//         name: "Big Buck Video",
//         id: "7KPTMJA1RKY55Q7Q72KXNMB288"
//     },

//     {
//         name: "Mindset TB 3",
//         id: "7KPSQ9PCV915FHY1ZZMC0T450H"
//     },

//     {
//         name: "Something not English",
//         id: "7KPSPXJ25Y0GX6MKD30BRY3BG6"
//     }
// ]

const pdfFile = [
  {
    name: "Big Buck Video",
    id: "7KPSMR7YD0F606X6T66WYGFCXE",
  },

  {
    name: "Getting start",
    id: "7KPTR03RN434FAF6AE3GD5X7EA",
  },

  {
    name: "Something not English",
    id: "7M8B6WCQMXK0VJZF4BCFQVK6HS",
  },

  {
    name: "Mindset level 3",
    id: "7KPTSQ54B022GNFT436WN81AW6",
  },

  {
    name: "SD Interview",
    id: "7KPSE1HHHH16KGV2ZM6WQHP6D1",
  },
];
const ChoosePDF = (props) => {
  const { getPdf } = props;

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
    console.log(formData)
    //axios.post('http://localhost:3030/uploadPdf', formData)
    axios
    //.post("http://localhost:3000/api/v1/login", currentAccount)
    .post("http://115.78.232.219:5012/api/documents", formData , {
      headers:{
        'Content-Type': "application/pdf",
        'Authorization': "Token token=\"secret\"", 
      }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function () {
      console.log("error roi do nha")
    });
  };

  return (
    <>
     
      <div style={{ marginTop: 50, marginLeft: 30 }}>
      <div>
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>

        <table className="file-list">
          <thead>
            <tr>
              <th>STT</th>
              <th>PDF File</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {pdfFile.map((pdf, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="pdf-title" onClick={() => getPdf(pdf)}>
                    {pdf.name}
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ChoosePDF;
