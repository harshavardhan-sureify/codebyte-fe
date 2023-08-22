import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../server";
import { Provider } from "react-redux";
import store from "../features/store";
import { AnsweredPolls } from "./AnsweredPolls";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Toaster from "../Toaster";
import { theme } from "../../themes/theme";
import "@testing-library/jest-dom";
import { ANSWERED_POLLS_URL } from "../../constants";
import * as ReactRouterDOM from "react-router-dom";
const MockAnsweredPolls = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Toaster />
                    <AnsweredPolls />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

describe("AnsweredPolls Component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render answered polls", async () => {
        render(<MockAnsweredPolls />);

        // Wait for the answered polls to be fetched and loaded
        await waitFor(() => {
            expect(screen.getByText("Answered Poll 1")).toBeInTheDocument();
        });
    });

    it("should render no answered polls message", async () => {
        server.use(
            rest.get(ANSWERED_POLLS_URL, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({ data: [] }));
            })
        );

        render(<MockAnsweredPolls />);

        // Wait for the message to appear
        await waitFor(() => {
            expect(
                screen.getByText("You haven't answered any polls yet")
            ).toBeInTheDocument();
        });
    });
    it("should render error message for internal server error", async () => {
        server.use(
            rest.get(ANSWERED_POLLS_URL, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ message: "Internal Server Error" })
                );
            })
        );

        render(<MockAnsweredPolls />);

        // Wait for the message to appear
        await waitFor(() => {
            expect(
                screen.getByText("Internal Server Error")
            ).toBeInTheDocument();
        });
    });

    it("should render error message for internal server error2.0", async () => {
        jest.doMock("react-router-dom", () => {
            return {
                ...jest.requireActual("react-router-dom"),
                useLocation: () => ({
                    pathname: "/my-custom-path/name/mocked/hey",
                    search: "",
                    hash: "2234",
                    state: null,
                    key: "default",
                }),
            };
        });
        server.use(
            rest.get(ANSWERED_POLLS_URL, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ message: "Internal Server Error" })
                );
            })
        );

        render(<MockAnsweredPolls />);

        // Wait for the message to appear
        await waitFor(() => {
            expect(
                screen.getByText("Internal Server Error")
            ).toBeInTheDocument();
        });
    });
});
