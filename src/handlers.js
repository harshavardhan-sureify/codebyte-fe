import { RestHandler } from "msw";
import { rest } from "msw";
import {
    ACTIVE_POLLS_URL,
    ALL_POLLS_URL,
    ANSWERED_POLLS_URL,
    CONFIRM_USER_URL,
    POLL_ANSWERS_URL,
    SIGNUP_URL,
    USER_INFO_URL,
} from "./constants";

export const handlers = [
    rest.post(SIGNUP_URL, async (req, res, ctx) => {
        const { name, email, password } = await req.json();
        if (email === "invalid@user.com") {
            return res(
                ctx.status(400),
                ctx.json({
                    status: 400,
                    message: "User already exists",
                    data: null,
                })
            );
        }
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Success",
                data: {
                    name: "Harha",
                    role: "user",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1ODMyODQsImlkIjoyNywicm9sZSI6InVzZXIiLCJlbWFpbCI6ImhhcnNoYXZhcmRoYW4uc2l2YWRoYW5hbSsyM0BzdXJlaWZ5LmNvbSJ9.S08ssyESUWwRmtOYZZa-vmPCJg_0KmOAnmeZzlZ9FtM",
                },
            })
        );
    }),
    rest.get(ACTIVE_POLLS_URL, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Success",
                data: [
                    {
                        poll_id: "9",
                        title: "Poll 1",
                        start_date: "2023-08-10",
                        end_date: "2023-08-18",
                    },
                    {
                        poll_id: "10",
                        title: "Poll 2",
                        start_date: "2023-08-10",
                        end_date: "2023-08-18",
                    },
                    {
                        poll_id: "18",
                        title: "Poll 3",
                        start_date: "2023-08-10",
                        end_date: "2023-08-18",
                    },
                ],
            })
        );
    }),
    rest.get(ANSWERED_POLLS_URL, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Success",
                data: [
                    {
                        poll_id: "1",
                        title: "Answered Poll 1",
                        start_date: "2023-08-01",
                        end_date: "2023-08-10",
                    },
                    // Add more mock answered poll data if needed
                ],
            })
        );
    }),
    rest.get(USER_INFO_URL, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Success",
                data: {
                    user: {
                        email: "admin@user.com",
                        name: "admin",
                    },
                },
            })
        );
    }),
    rest.get(POLL_ANSWERS_URL + "1", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Success",
                data: [
                    {
                        answerId: "4",
                        userName: "sai",
                        option: "yes",
                    },
                ],
            })
        );
    }),
    rest.get(POLL_ANSWERS_URL + "2", (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({
                status: 500,
                message: "Internal Error",
                data:null
            })
        );
    }),
    rest.post(CONFIRM_USER_URL, async (req, res, ctx) => {
        const { oldpassword } = await req.json();
        if (oldpassword === "wrongpassword") {
            return res(
                ctx.status(400),
                ctx.json({
                    status: 400,
                    message: "Invalid password",
                    data: null,
                })
            );
        }
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Success",
                data: null,
            })
        );
    }),
    rest.get(ALL_POLLS_URL, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Success",
                data: [
                    {
                        poll_id: "1",
                        title: "Favourite movie",
                        start_date: "2023-08-12",
                        end_date: "2023-08-24",
                    },
                ],
            })
        );
    })
];
