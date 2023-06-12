import styled from "@emotion/styled";
import {
    Box,
    Button,
    Card,
    Paper,
    TableCell,
    TableRow,
    TextField,
    Typography,
    tableCellClasses,
} from "@mui/material";
import { theme } from "../themes/theme";
export const MyTextField = styled(TextField)({
    margin: "8px 0px",
});
export const ImagePaper = styled(Paper)({
    padding: "2px 15px",
    margin: "20px 0px",
    backgroundColor: theme.palette.secondary.main,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});
export const ImageText = styled(Typography)({
    color: "white",
    fontWeight: "bold",
});

export const ErrorText = styled(Typography)(({ theme }) => ({
    color: "red",
    fontSize: "small",
    margin: "4px 0px 0px 4px",
}));

export const CreatePollContainer = styled(Paper)({
    width: "40%",
    minWidth: "350px",
    padding: "16px",
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export const StyledCard = styled(Card)({
    transition: "all 0.4s",
    maxWidth: 345,
    "&: hover": {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        transform: "scale(1.1)",
    },
});

export const StyledPollButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    "&: hover": {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const StyledSideBar = styled(Box)(({ theme }) => ({
    width: "15%",
    alignItems: "center",
    backgroundColor: "grey",
    height: "90vh",
}));

export const StyledOutletContainer = styled(Box)({
    flex: 1,
    overflow: "auto",
    padding: "2vh ",
    maxHeight: "86vh",
});

export const StyledCardDate = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60px",
    height: "60px",
    borderRadius: "5px",
    border: "1px solid grey",
});
