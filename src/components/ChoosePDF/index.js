import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopicIcon from "@mui/icons-material/Topic";
import AddIcon from '@mui/icons-material/Add';

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
  const {getPdf} = props

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", margin: '1rem' }}>
      <Button variant="contained" component="label">
        Upload File <AddIcon/>
        <input type="file" hidden />
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
        <MaterialList getPdf={getPdf}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MaterialTopic getPdf={getPdf}/>
      </TabPanel>
    </Box>
  );
}
