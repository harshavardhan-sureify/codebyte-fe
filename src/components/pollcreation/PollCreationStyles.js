import { Box, TextField, Typography, styled, Fab, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: "red",
  fontSize: "small",
  margin: "4px 0px 0px 4px",
}));

export const CreatePollContainer = styled(Paper)({
  width: "40%",
  minWidth: "350px",
  padding: 2,
});
