import React from "react";
import { render, screen } from "@testing-library/react";
import { ViewPolls } from "./ViewPolls";
import store from "../features/store";
import { theme } from "../../themes/theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";

const MockViewPolls = ({ activeFlag, message, pollsData, refetch }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <ViewPolls
                        activeFlag={activeFlag}
                        message={message}
                        pollsData={pollsData}
                        refetch={refetch}
                    />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

describe("View polls componenet", () => {
    it("should render all polls", () => {
        const pollsData = [
            {
                poll_id: "1",
                title: "Poll 1",
                start_date: "2023-08-01",
                end_date: "2023-08-10",
            },
            {
                poll_id: "2",
                title: "Poll 2",
                start_date: "2023-08-05",
                end_date: "2023-08-15",
            },
            {
                poll_id: "3",
                title: "Poll 3",
                start_date: "2023-08-03",
                end_date: "2023-08-13",
            },
            {
                poll_id: "4",
                title: "Poll 4",
                start_date: "2023-08-03",
                end_date: "2023-08-13",
            },
        ];
        render(
            <MockViewPolls
                activeFlag={false}
                message={"All polls"}
                pollsData={pollsData}
                refetch={() => {}}
            />
        );

        const pollTitles = screen.getAllByText(/^Poll/, { exact: false });
        expect(pollTitles).toHaveLength(4);
    });
    it("should render empty Data container when given 0 polls", () => {
        const pollsData = [];
        render(
            <MockViewPolls
                activeFlag={false}
                message={"No polls found"}
                pollsData={pollsData}
                refetch={() => {}}
            />
        );

        const emptyContainer = screen.getByText("No polls found");
        expect(emptyContainer).toBeInTheDocument();
    });
});
