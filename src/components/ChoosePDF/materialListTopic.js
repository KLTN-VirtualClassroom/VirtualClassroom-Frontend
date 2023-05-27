import * as React from "react";
import { styled } from "@mui/material/styles";
import { memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MaterialListTopic = (props) => {
  const pdfList = props.pdfFile.filter(function (pdf) {
    return pdf.courseId === props.topic;
  });

  const [searchFile, setSearchFile] = React.useState(pdfList);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    //setSearchTopic(searchTerm);
    //console.log(courseList.filter((course, index)=> course.courseName.includes(searchTerm)))
    setSearchFile(
        pdfList.filter((file, index) =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };


  return (
    <>
      <Box
        align="center"
        justify="center"
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          align: "center",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          component="label"
          startIcon={<ArrowBackIcon />}
          onClick={props.backTopic}
          sx={{ marginTop: 1, marginBottom: 0 }}
        >
          Back
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
      <TableContainer component={Paper} sx={{ maxHeight: 495 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          {/* <TableHead>
            <TableRow>
              <StyledTableCell>File name</StyledTableCell>
              <StyledTableCell>Dates</StyledTableCell>
              <StyledTableCell>Page Previous</StyledTableCell>
              <StyledTableCell>Last Access</StyledTableCell>
              <StyledTableCell>&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {searchFile.map((row) => (
              <StyledTableRow key={row.fileId}>
                <StyledTableCell component="th" scope="row" sx={{ ml: 3 }}>
                  {row.fileName}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => props.getPdf({ id: row.fileId })}>
                    Open
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default memo(MaterialListTopic);