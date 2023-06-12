import React from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "../admin/AddUser";
import SignupPage from "../SignupPage";
import PollCreate from "../admin/PollCreation";
import Trigger from "../admin/Trigger";
import LoginPage from "../LoginPage";
import { LandingPage } from "../user/LandingPage";
import { ActivePolls } from "../user/ActivePolls";
import { AnsweredPolls } from "../user/AnsweredPolls";
import { ViewSinglePoll } from "../user/ViewSinglePoll";
import NavBar from "../NavBar";
import { PageNotFound } from "../user/PageNotFound";
const AppRoutes = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/adduser" element={<AddUser />}></Route>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />}></Route>
                <Route path="/user" element={<LandingPage />}>
                    <Route index element={<PageNotFound />} />
                    <Route path="dashboard" element={<ActivePolls />} />
                    <Route path="dashboard/:id" element={<ViewSinglePoll />} />
                    <Route path="answeredpolls" element={<AnsweredPolls />} />
                    <Route
                        path="answeredpolls/:id"
                        element={<ViewSinglePoll />}
                    />
                </Route>
                <Route path="/create" element={<PollCreate />}></Route>
                <Route path="/trigger" element={<Trigger />}></Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
