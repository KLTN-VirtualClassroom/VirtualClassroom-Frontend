import * as React from "react"
import { styled } from "@mui/material/styles"
import { memo } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button } from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}))




const materialList = (props) => {
  let pdfFile = props.pdfFile

  if(props.topic){
    pdfFile = pdfFile.filter(function (pdf) {return pdf.courseId === props.topic})
    console.log(props.topic)

  }
  return (
    <TableContainer component={Paper} sx={{maxHeight: 350}}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>File name</StyledTableCell>
            <StyledTableCell>Dates</StyledTableCell>
            <StyledTableCell>Page Previous</StyledTableCell>
            <StyledTableCell>Last Access</StyledTableCell>
            <StyledTableCell>&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pdfFile.map(row => (
            <StyledTableRow key={row.fileId}>
              <StyledTableCell component="th" scope="row">
                {row.fileName}
              </StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ><Button variant="contained" onClick={()=>props.getPdf({id:row.fileId})}> Select</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default memo(materialList)
