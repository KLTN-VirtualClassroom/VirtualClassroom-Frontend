import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopicIcon from "@mui/icons-material/Topic";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import { useDispatch } from "react-redux";
import { getMaterial, addMaterial } from "../../redux/slices/materialSlice";

import MaterialList from "./materialList";
import MaterialTopic from "./materialTopic";
import config from "../../config/config";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChoosePDF = (props) => {
  const [value, setValue] = React.useState(0);
  const [pdfFile, setPdfFile] = React.useState([]);

  const { getPdf } = props;
  const dispatch = useDispatch();

  const handleUploadPdf = (event) => {
    const selectedFile = event.target.files[0];
    // axios
    //   .post("https://bangtrang.click/api/documents", selectedFile, {
    //     headers: {
    //       'Content-Type': "application/pdf",
    //       Authorization: "Token token=secret",
    //     },
    //   })
    let formData = new FormData();
    console.log(typeof selectedFile);
    formData.append("file", selectedFile);
    formData.append("filename", selectedFile.name);

    console.log(selectedFile);

    axios({
      method: "post",
      url: `${config.path.SERVER_PATH}/uploadPdf?teacherID=${props.userInfo.id}`,
      data: formData,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }).then((response) => {
      console.log(response.data);
      const fileUpload = response.data;
      if (response.status === 200)
        setPdfFile([
          fileUpload,
          ...pdfFile,
        ]);
    });

    // fetch("http://localhost:3030/uploadPdf", {
    //   method: 'POST',
    //   maxBodyLength: Infinity,
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data.path)
    // })
    // .catch(error => {
    //   console.error(error)
    // })

    // axios
    // .post("http://localhost:3030/material/uploadMaterial", formData)
    //   .then(function (response) {
    //     // setPdfFile([
    //     //   {
    //     //     name: event.target.files[0].name,
    //     //     id: response.document_id,
    //     //     topic: "Breakfast",
    //     //   },
    //     //   ...pdfFile,
    //     // ]);
    //     console.log(response)
    //   })
    //   .catch(function () {
    //     console.log("Error Upload");
    //   });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const getData = async () => {
      let pdfPersonal = [];
      let pdfTopic = [];
      axios.all([
        (pdfPersonal = await axios.get(
          `${config.path.SERVER_PATH}/material/getPersonalMaterial?teacherID=${props.userInfo.id}`
        )),
        (pdfTopic = await axios.get(
          `${config.path.SERVER_PATH}/material/getTopicMaterial`
        )),
      ]);
      const materials = [...pdfPersonal.data, ...pdfTopic.data];
      dispatch(getMaterial(materials));
      setPdfFile(materials);
    };
    getData();
  }, []);

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Button
        variant="contained"
        component="label"
        startIcon={<AddIcon />}
        sx={{ m: 3, background: "#308ee6" }}
      >
        Upload File
        <input type="file" hidden onChange={handleUploadPdf} />
      </Button>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Material Tabs"
          centered
        >
          <Tab
            icon={<MenuBookIcon />}
            label="E-Books"
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab
            icon={<TopicIcon />}
            label="Courses"
            iconPosition="start"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MaterialList getPdf={getPdf} pdfFile={pdfFile} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MaterialTopic getPdf={getPdf} pdfFile={pdfFile} />
      </TabPanel>
    </Box>
  );
};

export default React.memo(ChoosePDF);

const pdfList = [
  {
    name: "Big Buck Video",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: "Breakfast",
  },

  {
    name: "Getting start",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: "Breakfast",
  },

  {
    name: "Something not English",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: "Breakfast",
  },

  {
    name: "Mindset level 3",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: "Camera",
  },

  {
    name: "SD Interview",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: "Camera",
  },
];
