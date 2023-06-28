import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "../SignupPage";
import PollCreate from "../admin/PollCreation";
import AddUserButton from "../admin/AddUserButton";
import LoginPage from "../LoginPage";
import { LandingPage } from "../user/LandingPage";
import { ActivePolls } from "../user/ActivePolls";
import { AnsweredPolls } from "../user/AnsweredPolls";
import { ViewSinglePoll } from "../user/ViewSinglePoll";
import NavBar from "../NavBar";
import { ADMIN_ROLE, USER_ROLE } from "../../constants";
import AdminDashBoard from "../admin/AdminDashBoard";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";
import PublicRoute from "./PublicRoute";
import AllUsers from "./../admin/AllUsers";
 
import { Polls } from "./../admin/Polls";
import Profile from "../user/Profile";

const AppRoutes = () => {
  const user = useSelector(auth);
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          {user.role === ADMIN_ROLE && (
            <Route path="/admin" element={<LandingPage />}>
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route path="create" element={<PollCreate />} />
              <Route path="adduser" element={<AddUserButton />} />
              <Route path="allusers" element={<AllUsers />} />
              <Route
                path="allpolls"
                element={<Polls type={"allPolls"} />}
              />
              <Route
                path="activepolls"
                element={<Polls type={"activePolls"} />}
              />
              <Route path="activepolls/:id" element={<ViewSinglePoll />} />
              <Route path="allpolls/:id" element={<ViewSinglePoll />} />

              <Route path="profile" element={<Profile />} />
            </Route>
          )}
          {user.role === USER_ROLE && (
            <Route path="/user" element={<LandingPage />}>
              <Route path="dashboard" element={<ActivePolls />} />
              <Route path="dashboard/:id" element={<ViewSinglePoll />} />
              <Route path="answeredpolls" element={<AnsweredPolls />} />
              <Route path="answeredpolls/:id" element={<ViewSinglePoll />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
