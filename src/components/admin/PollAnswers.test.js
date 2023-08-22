import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PollAnswers } from "./PollAnswers";
import { Provider } from "react-redux";
import store from "../features/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../themes/theme";
import { server } from "../../server";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { POLL_ANSWERS_URL } from "../../constants";
import Toaster from "../Toaster";

const MockPollAnswers = ({ pollId }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Toaster />
                    <PollAnswers pollId={pollId} />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

describe("Test PollAnswers", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it("should fetch the details correctly", async () => {
        render(<MockPollAnswers pollId={"1"} />);
        expect(screen.getByText("Loading")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("sai")).toBeInTheDocument();
        });
    });
    it("should render error toaster on API error", async () => {
        render(<MockPollAnswers pollId={"2"} />);
        expect(screen.getByText("Loading")).toBeInTheDocument();

        // Wait for the error toaster message to appear
        await waitFor(() => {
            expect(
                screen.getByText("Internal Error", { exact: false })
            ).toBeInTheDocument();
        });
    });
});
