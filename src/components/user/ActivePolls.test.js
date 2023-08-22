import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ActivePolls } from "./ActivePolls";
import { Provider } from "react-redux";
import store from "../features/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Toaster from "../Toaster";
import { theme } from "../../themes/theme";
import { server } from "../../server";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { ACTIVE_POLLS_URL } from "../../constants";

const MockActivePolls = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Toaster />
                    <ActivePolls />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

describe("ActivePolls Component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close())  

    it("should render active polls", async () => {
        render(<MockActivePolls />);

        // Wait for the active polls to be fetched and loaded
        await waitFor(() => {
            expect(screen.getByText("Poll 1")).toBeInTheDocument();
            // Add more assertions as needed
        });
    });

    it("should render no active polls message", async () => {
        server.use(
            rest.get(ACTIVE_POLLS_URL, async (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        status: 200,
                        message: "Success",
                        data: [],
                    })
                );
            })
        );
        render(<MockActivePolls />);

        // Wait for the message to appear
        await waitFor(() => {
            expect(
                screen.getByText("Currently there are no active polls")
            ).toBeInTheDocument();
        });
    });

    it("should render error toaster on API error", async () => {
        server.use(
            rest.get(ACTIVE_POLLS_URL, async (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({
                        status: 500,
                        message: "Internal Server Error",
                        data: null,
                    })
                );
            })
        );
        render(<MockActivePolls />);

        // Wait for the error toaster message to appear
        await waitFor(() => {
            expect(
                screen.getByText("Internal Server Error", { exact: false })
            ).toBeInTheDocument();
        });
    });
});
