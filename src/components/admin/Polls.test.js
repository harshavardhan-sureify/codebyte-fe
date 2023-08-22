import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Polls } from "./Polls";
import { Provider } from "react-redux";
import store from "../features/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../themes/theme";
import { server } from "../../server";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { ALL_POLLS_URL } from "../../constants";
import Toaster from "../Toaster";

const MockPolls = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Toaster />
                    <Polls />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

describe("Test All Polls", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it("Fetch the poll details correctly", async () => {
        render(<MockPolls />);
        expect(screen.getByText("Loading")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Favourite movie")).toBeInTheDocument();
        });
    });
    it("should render error toaster on API error", async () => {
        server.use(
            rest.get(ALL_POLLS_URL, async (req, res, ctx) => {
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
        render(<MockPolls />);

        // Wait for the error toaster message to appear
        await waitFor(() => {
            expect(
                screen.getByText("Internal Server Error", { exact: false })
            ).toBeInTheDocument();
        });
    });
    it("should render polls according to search value", async () => {
        server.use(
            rest.get(ALL_POLLS_URL, async (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        status: 200,
                        message: "success",
                        data: [
                            {
                                poll_id: "1",
                                title: "Favourite movie",
                                start_date: "2023-08-25",
                                end_date: "2023-08-29",
                            },
                        ],
                    })
                );
            })
        );
        render(<MockPolls />);
        await waitFor(() => {
            expect(screen.queryByText("Loading")).not.toBeInTheDocument();
        });
        const searchInput = screen.getByLabelText("Search Poll");
        fireEvent.change(searchInput, { target: { value: "favourite" } });
        expect(searchInput.value).toBe("favourite");
        await waitFor(() => {
            expect(screen.getByText("Favourite movie")).toBeInTheDocument();
        });
        fireEvent.change(searchInput, { target: { value: "" } });
        expect(searchInput.value).toBe("");
        fireEvent.focus(searchInput);
        const iconButton = screen.getByLabelText("clear");
        expect(iconButton).toBeInTheDocument();
        fireEvent.click(iconButton);
    });
    it("Testing selected Tabs", async () => {
        server.use(
            rest.get(ALL_POLLS_URL, async (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        status: 200,
                        message: "success",
                        data: [
                            {
                                poll_id: "1",
                                title: "Favourite movie",
                                start_date: "2023-08-1",
                                end_date: "2023-08-06",
                            },
                        ],
                    })
                );
            })
        );
        render(<MockPolls />);
        await waitFor(() => {
            expect(screen.queryByText("Loading")).not.toBeInTheDocument();
        });
        const tab = screen.getByRole("tab", { name: "Ended" });
        fireEvent.click(tab);
        const button = screen.getByRole("button", { name: "Create Poll" });
        fireEvent.click(button);
        expect(button).toBeInTheDocument();
    });
});
