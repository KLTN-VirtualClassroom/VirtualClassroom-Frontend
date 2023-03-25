import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopicIcon from "@mui/icons-material/Topic";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import MaterialList from "./materialList";
import MaterialTopic from "./materialTopic"

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
          <Typography>{children}</Typography>
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





export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [pdfFile, setPdfFile] = React.useState(pdfList);

  const {getPdf} = props

  
const handleUploadPdf = (event) => {
  const selectedFile = event.target.files[0]
  //const selectedFile = {title: selectedFile2.name, ...selectedFile2}
  console.log(selectedFile);
  axios
  .post("https://bangtrang.click/api/documents", selectedFile , {
    headers:{
      'Content-Type': "application/pdf",
      'Access-Control-Allow-Origin': "*",
      'Authorization': "Token token=secret",
    }
  })
  .then(function (response) {
    setPdfFile([{name: event.target.files[0].name, id: response.document_id, topic: 'Breakfast'}, ...pdfFile])
  })
  .catch(function () {
    console.log("error roi do nha")
  });
};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <Box sx={{ width: "100%", margin: '1rem' }}>
      <Button variant="contained" component="label" margin='2rem'>
        Upload File <AddIcon/>
        <input type="file" hidden onChange={handleUploadPdf}/>
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
        <MaterialList getPdf={getPdf} pdfFile={pdfFile}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MaterialTopic getPdf={getPdf} pdfFile={pdfFile}/>
      </TabPanel>
    </Box>
  );
}


const pdfList = [
  {
    name: "Big Buck Video",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: 'Breakfast'
  },

  {
    name: "Getting start",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: 'Breakfast'
  },

  {
    name: "Something not English",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: 'Breakfast'
  },

  {
    name: "Mindset level 3",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: 'Camera'
  },

  {
    name: "SD Interview",
    id: "7KS3FWE0DGY9CKZE4X9X414PYZ",
    topic: 'Camera'
  }
];
