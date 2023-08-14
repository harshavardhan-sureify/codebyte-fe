import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Poll } from "./PollCard";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import store from "../features/store";
import { theme } from "../../themes/theme";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

const MockPollCard = ({ activeFlag, poll, refetch }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Poll
                        activeFlag={activeFlag}
                        poll={poll}
                        refetch={refetch}
                    />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

describe("Poll Component", () => {
    const poll = {
        poll_id: 1,
        title: "Test Poll",
        start_date: "2023-08-01T00:00:00.000Z",
        end_date: "2023-08-30T00:00:00.000Z",
    };

    it("should render poll details correctly for user", async () => {
        render(
            <MockPollCard activeFlag={true} poll={poll} refetch={() => {}} />
        );

        const pollTitle = screen.getByTitle(poll.title);
        const answerPollButton = screen.getByText("Answer Poll");
        expect(pollTitle).toBeTruthy();
        expect(answerPollButton).toBeTruthy();
    });

    it("should render poll details correctly for admin", async () => {
        render(
            <MockPollCard activeFlag={false} poll={poll} refetch={() => {}} />
        );

        const pollTitle = screen.getByTitle(poll.title);
        const viewPollButton = screen.getByText("View Poll");
        expect(pollTitle).toBeTruthy();
        expect(viewPollButton).toBeTruthy();
    });

    it("should navigate to poll page on answer poll button click", async () => {
        const { container } = render(
            <MockPollCard activeFlag={true} poll={poll} refetch={() => {}} />
        );

        const answerPollButton = screen.getByText("Answer Poll");

        await act(() => {
            fireEvent.click(answerPollButton);
        });

        await waitFor(() => {
            expect(window.location.href).toBe(
                `http://localhost/${poll.poll_id}`
            );
        });
    });

    it("should open edit dialog on edit button click", () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 2);
        const startDate = currentDate.toISOString();
        currentDate.setDate(currentDate.getDate() + 2);
        const endDate = currentDate.toISOString();
        const poll = {
            poll_id: 1,
            title: "Test Poll",
            start_date: startDate,
            end_date: endDate,
        };
        render(
            <MockPollCard activeFlag={true} poll={poll} refetch={() => {}} />
        );

        const editButton = screen.getByLabelText("Edit");
        fireEvent.click(editButton);

        expect(window.location.href).toBe(
            `http://localhost/admin/edit/${poll.poll_id}`
        );
    });

    it("should open delete dialog on delete button click", () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 2);
        const startDate = currentDate.toISOString();
        currentDate.setDate(currentDate.getDate() + 2);
        const endDate = currentDate.toISOString();
        const poll = {
            poll_id: 1,
            title: "Test Poll",
            start_date: startDate,
            end_date: endDate,
        };
        render(
            <MockPollCard activeFlag={true} poll={poll} refetch={() => {}} />
        );

        const deleteButton = screen.getByLabelText("Delete");
        fireEvent.click(deleteButton);

        expect(
            screen.getByText("Are you sure want to delete this poll?")
        ).toBeTruthy();
    });

    it("should close the poll on confirm delete", async () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 2);
        const startDate = currentDate.toISOString();
        currentDate.setDate(currentDate.getDate() + 2);
        const endDate = currentDate.toISOString();
        const poll = {
            poll_id: 1,
            title: "Test Poll",
            start_date: startDate,
            end_date: endDate,
        };
        render(
            <MockPollCard activeFlag={true} poll={poll} refetch={() => {}} />
        );
        const deleteButton = screen.getByLabelText("Delete");
        fireEvent.click(deleteButton);
        const confirmMessage = screen.getByText(
            "Are you sure want to delete this poll?"
        );

        expect(confirmMessage).toBeInTheDocument();

        const buttonWithTextNo = screen.getByText("No");
        fireEvent.click(buttonWithTextNo);
        await waitFor(() => {
            expect(confirmMessage).not.toBeInTheDocument();
        });
    });
});
