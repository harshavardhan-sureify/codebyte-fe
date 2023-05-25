import {
    Box,
    TextField,
    Typography,
    styled,
    Fab,
  } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const Option = ({
    option,
    handleOptionChange,
    handleDeleteOption,
    errors,
    index,
    canDelete,
  }) => (
    <Box sx={{ textAlign: "left" }}>
      <Box
        sx={{ width: "100%", marginTop: 2 }}
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        textAlign="center"
        gap={2}
      >
        <TextField
          label={`Option ${index + 1}`}
          variant="outlined"
          sx={{ width: canDelete ? "88%" : "100%" }}
          value={option}
          onChange={(e) => handleOptionChange(e.target.value, index)}
        />
        {canDelete && (
          <Fab
            color="error"
            aria-label="delete"
            size="small"
            sx={{width:"36px",height:"2px",borderRadius:"50%"}}
            onClick={() => handleDeleteOption(index)}
          >
            <ClearIcon sx={{width:"12px"}}/>
          </Fab>
        )}
      </Box>
      {errors.options[index] && <ErrorText>Enter valid option</ErrorText>}
      {!errors.options[index] && errors.optionErrors[index] && (
        <ErrorText>Duplicate option</ErrorText>
      )}
    </Box>
  );

  export const ErrorText = styled(Typography)(({ theme }) => ({
    color: "red",
    fontSize: "small",
    margin: "4px 0px 0px 4px",
  }));