import * as React from "react"
import { styled } from "@mui/material/styles"
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
    }
  ];

export default function materialList(props) {
  return (
    <TableContainer component={Paper} sx={{maxHeight: 500}}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>File name</StyledTableCell>
            <StyledTableCell>Calories</StyledTableCell>
            <StyledTableCell>Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell>Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell>&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pdfFile.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ><Button variant="contained" onClick={()=>props.getPdf(row)}> Select</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
