import { useEffect, useState } from "react";
import EmailPage from "./EmailPage";
import VerificationPage from "./VerificationPage";
import ResetPage from "./ResetPage";
import { FORGOT_PASSWORD_URL } from "../../constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleToaster } from "../features/Toaster.reducer";
const ForgetPassword = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [token, setToken] = useState("");
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
            const data = { email: email.trim()};
            const res = await axios.post(FORGOT_PASSWORD_URL, data);
            if (res.data.status === 200) {
                setToken(res.data.data.otpToken);
                if (page === 0) {
                    handlePage();
                }
                handleToast("OTP sent successfully");
            }
        } catch (err) {
            if (err.response.data.status === 500) {
                handleToast("Internal server error");
            } else {
                setErrors(err.response.data.message);
            }
        } finally {
            setOpen(false);
        }
    };

    const handleToast = (message) => {
        dispatch(
            handleToaster({
                message,
                severity:
                    message === "Internal server error" ? "error" : "success",
                open: true,
            })
        );
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
        setToast: handleToast,
    };

    return (
        <>
            {page === 0 && <EmailPage prop={prop} />}
            {page === 1 && <VerificationPage prop={prop} />}
            {page === 2 && <ResetPage prop={prop} />}
        </>
    );
};

export default ForgetPassword;
