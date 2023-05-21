import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import axios from 'axios'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Typography } from "@mui/material";
import MaterialList from "./materialList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import config from "../../config/config";

const MaterialTopic = (props) => {
  const [course, setCourse] = React.useState(null);
  const [topicList, setTopicList] = React.useState([]);
  const [courseList, setCourseList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const openTopic = (choosenTopic) => {
    setCourse(choosenTopic.courseId);
  };

  const backTopic = () => {
    setCourse(null);
  };

  React.useEffect(() => {
    async function getAuth() {

      let pdfCourse = [];
      let pdfTopic = [];
      axios.all([
        (pdfCourse = await axios.get(
          `${config.path.SERVER_PATH}/course/getCourse`
        )),
        (pdfTopic = await axios.get(
          `${config.path.SERVER_PATH}/topic/getTopicByCourse`
        )),
      ]);
      //console.log(pdfTopic)
      setCourseList(pdfCourse.data);
      setTopicList(pdfTopic.data);
      setIsLoading(false);
    }
    getAuth();
   
  }, []);

  if (isLoading) <></>;
  else
    return (
      <Box sx={{ flexGrow: 1, height: 450 }}>
        {course ? (
          <>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              size = "small"
              sx={{ marginBottom: 2,  background: "#308ee6" }}
              onClick={backTopic}
            >
              Back
            </Button>
            <MaterialList
              getPdf={props.getPdf}
              pdfFile={topicList}
              topic={course}
            />
          </>
        ) : (
          <Grid
            container
            sx={{ height: 450, overflow: "auto" }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {courseList.map((row, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => openTopic(row)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={row.courseThumbnail}
                      alt="topic image"
                    />
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {row.courseName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
};

export default React.memo(MaterialTopic);

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//     author: "@bkristastucchio",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//     author: "@rollelflex_graphy726",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//     author: "@helloimnik",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//     author: "@nolanissac",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//     author: "@hjrc33",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//     author: "@arwinneil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//     author: "@tjdragotta",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//     author: "@katie_wasserman",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//     author: "@silverdalex",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//     author: "@shelleypauls",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//     author: "@peterlaster",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//     author: "@southside_customs",
//   },
// ];
