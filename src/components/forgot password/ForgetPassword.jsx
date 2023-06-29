import { useEffect, useState } from "react";
import EmailPage from "./EmailPage";
import VerificationPage from "./VerificationPage";
import ResetPage from "./ResetPage";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { forgotPassword } from "../../constants";
import axios from "axios";
const ForgetPassword = () => {
  const [page, setPage] = useState(0);
  const [token, setToken] = useState("");
  const [toast, setToast] = useState("");
  const [errors, setErrors] = useState("");
  const [open, setOpen] = useState("");
  const [email, setEmail] = useState("");
  const handlePage = () => {
    setPage(page + 1);
  };

  const sendMail = () => {
    sendData();
  };
  useEffect(() => {
    setErrors("");
  }, [page]);

  const sendData = async () => {
    try {
      const data = { email: email };
      const res = await axios.post(forgotPassword, data);
      if (res.data.status === 200) {
        setToken(res.data.data.otpToken);
        if (page === 0) {
          handlePage();
        }
        setToast("otp sent");
      }
    } catch (err) {
      if (err.response.data.status === 500) {
        setToast("Internal server error");
      } else {
        setErrors(err.response.data.data.error);
      }
    } finally {
      setOpen(false);
    }
  };

  const prop = {
    errors: errors,
    setErrors: setErrors,
    open: open,
    setOpen: setOpen,
    token: token,
    setToken: setToken,
    page: handlePage,
    sendData: sendMail,
    email: email,
    setEmail: setEmail,
    setToast: setToast,
  };

  return (
    <>
      {toast && (
        <Snackbar
          open={toast?true:false}
          autoHideDuration={3200}
          sx={{ paddingTop: "43px" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={() => setToast("")}
        >
          <Alert
            severity={toast === "Internal server error" ? "error" : "success"}
            variant="standard"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setToast("")}
              >
                <CancelIcon></CancelIcon>
              </IconButton>
            }
          >
            {toast}
          </Alert>
        </Snackbar>
      )}
      {page === 0 && <EmailPage prop={prop} />}
      {page === 1 && <VerificationPage prop={prop} />}
      {page === 2 && <ResetPage prop={prop} />}
    </>
  );
};

export default ForgetPassword;