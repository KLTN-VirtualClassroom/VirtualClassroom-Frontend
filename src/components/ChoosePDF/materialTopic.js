import * as React from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import MaterialListTopic from "./materialListTopic";
import SearchIcon from "@mui/icons-material/Search";
import config from "../../config/config";

import { getCourseList } from "../../redux/slices/courseSlice.js";
import {getTopicList} from "../../redux/slices/topicSlice.js"

const MaterialTopic = (props) => {
  const [course, setCourse] = React.useState(null);
  const [topicList, setTopicList] = React.useState(props.pdfTopic);
  const [courseList, setCourseList] = React.useState(props.pdfCourse);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchCourse, setSearchCourse] = React.useState(props.pdfCourse);
  const data = useSelector(state => state.material);
  

  //const dispatch = useDispatch();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    //setSearchTopic(searchTerm);
    //console.log(courseList.filter((course, index)=> course.courseName.includes(searchTerm)))
    setSearchCourse(
      courseList.filter((course, index) =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const openTopic = (choosenTopic) => {
    setCourse(choosenTopic.courseId);
  };

  const backTopic = () => {
    setCourse(null);
    setSearchCourse(courseList);
  };

  // React.useEffect(() => {
  //   const getData = async function () {
  //     let pdfCourse = [];
  //     let pdfTopic = [];
  //     axios.all([
  //       (pdfCourse = await axios.get(
  //         `${config.path.SERVER_PATH}/course/getCourse`
  //       )),
  //       (pdfTopic = await axios.get(
  //         `${config.path.SERVER_PATH}/topic/getTopicByCourse`
  //       )),
  //     ]);

  //     dispatch(getCourseList(pdfCourse.data));
  //     dispatch(getTopicList(pdfTopic.data));

  //     setTopicList(pdfTopic.data);
  //     setCourseList(pdfCourse.data);
  //     setSearchCourse(pdfCourse.data);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, []);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 25 }}>
        <CircularProgress></CircularProgress>
      </Box>
    );
  else
    return (
      <Box sx={{ flexGrow: 1, height: 450 }}>
        {course ? (
          <>
            {/* <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              size="small"
              sx={{ marginBottom: 2, background: "#308ee6" }}
              onClick={backTopic}
            >
              Back
            </Button> */}
            <MaterialListTopic
              getPdf={props.getPdf}
              pdfFile={topicList}
              topic={course}
              backTopic={backTopic}
            />
          </>
        ) : (
          <>
            <Box
              align="center"
              justify="center"
              sx={{
                mb: 4,
                display: "flex",
                justifyContent: "space-between",
                align: "center",
              }}
            >
              <Button
                size="small"
                variant="variant"
                component="label"
                //startIcon={<ArrowBackIcon />}
                onClick={props.backTopic}
                sx={{ marginTop: 1, marginBottom: 0, fontWeight: "600" }}
              >
                Course List
              </Button>
              <TextField
                id="standard-search"
                label="Search course"
                type="search"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
                sx={{ width: 200 }}
              />
            </Box>
            <Grid
              container
              sx={{ height: 480, overflow: "auto" }}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {searchCourse.map((row, index) => (
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={index}
                  // sx={{ display: "flex" }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea
                      onClick={() => openTopic(row)}
                      // sx={{
                      //   display: "flex",
                      //   flexDirection: "column",
                      //   justifyContent: "space-between",
                      //   height: "100%",
                      // }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={row.courseThumbnail}
                        alt="topic image"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          align="center"
                          fontWeight={"bold"}
                          fontSize={"1rem"}
                          component="div"
                        >
                          {row.courseName}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    );
};

export default React.memo(MaterialTopic);

