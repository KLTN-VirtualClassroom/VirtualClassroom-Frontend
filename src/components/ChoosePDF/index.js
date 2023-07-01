import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopicIcon from "@mui/icons-material/Topic";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { useDispatch } from "react-redux";
import { getMaterial, addMaterial } from "../../redux/slices/materialSlice";
import { getCourseList } from "../../redux/slices/courseSlice.js";
import { getTopicList } from "../../redux/slices/topicSlice.js";

import {
  useGetCourseListMutation,
  useGetTopicListMutation,
  useGetPersonalMaterialMutation,
} from "../../assets/materialApi.js";

import MaterialList from "./materialList";
import MaterialTopic from "./materialTopic";
import { useSelector } from "react-redux";

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
  const [pdfFile, setPdfFile] = React.useState(
    useSelector((state) => state.material)
  );
  const [pdfTopic, setPdfTopic] = React.useState(
    useSelector((state) => state.topic)
  );
  const [pdfCourse, setPdfCourse] = React.useState(
    useSelector((state) => state.course)
  );
  const [getPersonalPdf] = useGetPersonalMaterialMutation();
  const [getPdfCourse] = useGetCourseListMutation();
  const [getPdfTopic] = useGetTopicListMutation();

  const [isLoading, setIsLoading] = React.useState(true);

  const { getPdf } = props;

  const handleUploadPdf = (event) => {
    const selectedFile = event.target.files[0];

    let formData = new FormData();
    // console.log(typeof selectedFile);
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
      if (response.status === 200) setPdfFile([fileUpload, ...pdfFile]);
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const getData = async () => {
      const listMaterial = await getPersonalPdf(props.userInfo.id);
      const listCourse = await getPdfCourse();
      const listTopic = await getPdfTopic();
      setPdfFile(listMaterial.data);
      setPdfCourse(listCourse.data);
      setPdfTopic(listTopic.data);

      //setPdfFile(listMaterial)
      // let pdfPersonal = [];
      // let pdfCourse = [];
      // let pdfTopic = [];
      // axios.all([
      //   (pdfPersonal = await axios.get(
      //     `${config.path.SERVER_PATH}/material/getPersonalMaterial?teacherID=${props.userInfo.id}`
      //   )),
      //   (pdfCourse = await axios.get(
      //     `${config.path.SERVER_PATH}/course/getCourse`
      //   )),
      //   (pdfTopic = await axios.get(
      //     `${config.path.SERVER_PATH}/topic/getTopicByCourse`
      //   )),
      // ]);
      // // const materials = [...pdfPersonal.data, ...pdfTopic.data];
      // const materials = [...pdfPersonal.data];

      // dispatch(getMaterial(materials));
      // dispatch(getCourseList(pdfCourse.data));
      // dispatch(getTopicList(pdfTopic.data));
      // setPdfFile(materials);
      // setPdfCourse(pdfCourse.data);
      // setPdfTopic(pdfTopic.data);
      setIsLoading(false);
    };
    if (pdfCourse.length === 0 && pdfTopic.length === 0) getData();
    else setIsLoading(false);
  }, []);

  return (
    <Box sx={{ width: "100%", p: 0 }}>
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
            sx={{ textTransform: "none", fontWeight: "500" }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<TopicIcon />}
            label="Courses"
            iconPosition="start"
            sx={{ textTransform: "none", fontWeight: "500" }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 25 }}>
            <CircularProgress></CircularProgress>
          </Box>
        ) : (
          <MaterialList
            getPdf={getPdf}
            pdfFile={pdfFile}
            handleUploadPdf={handleUploadPdf}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MaterialTopic
          getPdf={getPdf}
          pdfFile={pdfFile}
          pdfTopic={pdfTopic}
          pdfCourse={pdfCourse}
        />
      </TabPanel>
    </Box>
  );
};

export default React.memo(ChoosePDF);
