import styled from "@emotion/styled";
import { Paper, TextField, Typography } from "@mui/material";
import { theme } from "../themes/theme";
export const MyTextField = styled(TextField)({
  margin: "8px 0px",
});
export const ImagePaper = styled(Paper)({
  padding: "2px 15px",
  margin: "20px 0px",
  backgroundColor: theme.palette.primary.main,
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
