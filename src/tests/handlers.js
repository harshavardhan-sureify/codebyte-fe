import { rest } from "msw";
import { LOGIN_URL } from "../constants";

export const handlers = [
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
];
