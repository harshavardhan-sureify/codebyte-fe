
import { rest } from "msw";
import {
    ACTIVE_POLLS_URL,
    ADD_USER_URL,
    ALL_USERS_URL,
    ANSWERED_POLLS_URL,
    CONFIRM_USER_URL,
    FORGOT_PASSWORD_URL,
    LOGIN_URL,
    SIGNUP_URL,
    UPDATE_USER_STATUS_URL,
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
    rest.post(FORGOT_PASSWORD_URL, async (req, res, ctx) => {
        const { email } = await req.json();
        if (email === "admin@gmail.com") {
            return res(
                ctx.status(200),
                ctx.json({
                    status: 200,
                    message: "Success",
                    data: {
                        otpToken:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIxNzc2MDMsIlVzZXJJZCI6MSwiT3RwIjoiNDEwOCIsIk90cFN0YXR1cyI6ZmFsc2V9.Hj6vojrsWsVuYSnq2D5gnxsbYo_81J-cXaGntsKDP2Q",
                    },
                })
            );
        } else if (email === "admin1@gmail.com") {
            return res(
                ctx.status(400),
                ctx.json({
                    status: 400,
                    message: "user doesn't exist",
                    data: null,
                })
            );
        } else {
            return res(
                ctx.status(500),
                ctx.json({
                    status: 500,
                    message: "Internal server error",
                    data: null,
                })
            );
        }
    }),

    rest.get(ALL_USERS_URL, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "users retrieved successfully",
                data: {
                    users: [
                        {
                            name: "s harsha",
                            user_id: "2",
                            email: "harshavardhan.sivadhanam@sureify.com",
                            is_active: "1",
                            created_at: "2023-07-13 12:12:30",
                        },
                        {
                            name: "chandhu",
                            user_id: "5",
                            email: "chanduprakash.padamati@sureify.com",
                            is_active: "0",
                            created_at: "2023-07-13 12:21:25",
                        },
                    ],
                },
            })
        );
    }),

    rest.post(UPDATE_USER_STATUS_URL, async (req, res, ctx) => {
        let { userId } = await req.json();
        if (userId === "2") {
            return res(
                ctx.status(200),
                ctx.json({
                    status: 200,
                    message: "User status changed successfully",
                    data: {
                        userId: "2",
                    },
                })
            );
        } else {
            return res(
                ctx.status(500),
                ctx.json({
                    status: 500,
                    message: "Internal server error",
                    data: null,
                })
            );
        }
    }),
    rest.post(LOGIN_URL, async (req, res, ctx) => {
        const { email, password } = await req.json();
        if (email === "notexisting@gmail.com") {
            return res(
                ctx.status(404),
                ctx.json({
                    status: 404,
                    message: "User doesn't exists",
                    data: null,
                })
            );
        } else if (password === "Hel@1234") {
            return res(
                ctx.status(400),
                ctx.json({
                    status: 400,
                    message: "Incorrect password",
                    data: null,
                })
            );
        } else if (email === "servererror@gmail.com") {
            return res(
                ctx.status(500),
                ctx.json({
                    status: 500,
                    message: "Internal server error",
                    data: null,
                })
            );
        } else {
            return res(
                ctx.status(200),
                ctx.json({
                    status: 200,
                    message: "success",
                    data: {
                        name: "mani",
                        role: "user",
                        token: "jbkhvnifdkvnifjsdkvjnifsdkvcjsfkndmvosdfnkvjdncvknfdvljkksfdinvkjmesfn",
                    },
                })
            );
        }
    }),
    rest.post(ADD_USER_URL, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 200,
                message: "Credentials has been successfully sent to the user",
                data: null,
            })
        );
    }),
];
