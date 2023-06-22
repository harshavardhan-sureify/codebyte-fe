import { useState } from "react";
import EmailPage from "./EmailPage";
import VerificationPage from "./VerificationPage";
import ResetPage from "./ResetPage";

const ForgetPassword = () => {
  const [page, setPage] = useState(0);
  const handlePage = () => {
    setPage(page + 1);
  };
  return (
    <>
      {page === 0 && <EmailPage page={handlePage} />}
      {page === 1 && <VerificationPage page={handlePage} />}
      {page === 2 && <ResetPage />}
    </>
  );
};

export default ForgetPassword;
