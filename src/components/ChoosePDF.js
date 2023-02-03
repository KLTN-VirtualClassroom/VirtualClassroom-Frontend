import { useEffect } from "react";

const pdfFile = [
    {
        name: "Big Buck Video",
        id: "7KPTMJA1RKY55Q7Q72KXNMB288"
    },

    {
        name: "Mindset TB 3",
        id: "7KPSQ9PCV915FHY1ZZMC0T450H"
    },

    {
        name: "Something not English",
        id: "7KPSPXJ25Y0GX6MKD30BRY3BG6"
    }
]

const ChoosePDF = (props) => {

    const {getPdf} = props;

  return (
    <>
      <div style={{ marginTop: 50, marginLeft: 30 }}>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>PDF File</th>
            </tr>
          </thead>
          <tbody>
            {pdfFile.map((pdf, index) => {
              return (
                <tr key={index} >
                  <td>{index +1 }</td>
                  <td onClick={() => getPdf(pdf)}>{pdf.name}</td>
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
