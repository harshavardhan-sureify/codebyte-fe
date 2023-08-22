import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Profile";
import { server } from "../../server";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import store from "../features/store";
import { theme } from "../../themes/theme";
import { act } from "react-dom/test-utils";
import Toaster from "../Toaster";

const MockProfile = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Toaster />
                    <Profile />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

describe("Profile Component Testing ", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render all the data correctly", async () => {
        act(() => {
            render(<MockProfile />);
        });
        // Add assertions to check profile data is rendered correctly
        await waitFor(() => {
            const nameField = screen.getByLabelText("Name");
            const emailField = screen.getByLabelText("Email");
            const passwordButton = screen.getByRole("button", {
                name: "Click to change password",
            });
            const updateButton = screen.getByRole("button", {
                name: "Update",
            });
            expect(nameField).toBeInTheDocument();
            expect(emailField).toBeInTheDocument();
            expect(passwordButton).toBeInTheDocument();
            expect(updateButton).toBeInTheDocument();
            expect(nameField.value).toBe("admin");
            expect(emailField.value).toBe("admin@user.com");
            expect(passwordButton.disabled).toBeTruthy();
        });
    });

    it("should render the confirm user pop up when the user clicks on update and vice versa", async () => {
        act(() => {
            render(<MockProfile />);
        });
        const updateButton = screen.getByRole("button", {
            name: "Update",
        });
        act(() => {
            fireEvent.click(updateButton);
        });
        let confirmText = null;
        await waitFor(() => {
            confirmText = screen.getByText("Confirm its you!!");
            //checking the pop up present or not
            expect(confirmText).toBeInTheDocument();
            const cancelButton = screen.getByRole("button", {
                name: "Cancel",
            });
            const submitButton = screen.getByRole("button", {
                name: "Submit",
            });
            expect(cancelButton).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();
            // //closing the pop up bu clicking on the cancel button
        });
        act(() => {
            const cancelButton = screen.getByRole("button", {
                name: "Cancel",
            });
            fireEvent.click(cancelButton);
        });
        await waitFor(() => {
            expect(confirmText).not.toBeInTheDocument();
        });
    });

    it("should render wrong password if password is wrong else should enable all text fields", async () => {
        act(() => {
            render(<MockProfile />);
        });

        const updateButton = screen.getByRole("button", {
            name: "Update",
        });

        act(() => {
            fireEvent.click(updateButton);
        });

        let confirmText = null;
        await waitFor(() => {
            confirmText = screen.getByText("Confirm its you!!");
            //checking the pop up present or not
            expect(confirmText).toBeInTheDocument();
        });
        const passwordLabel = screen.getByText("Enter your password");
        const passwordField = passwordLabel.parentElement.querySelector(
            'input[type="password"]'
        );
        act(() => {
            fireEvent.change(passwordField, {
                target: { value: "wrongpassword" },
            });
        });

        const submitButton = screen.getByRole("button", {
            name: "Submit",
        });

        act(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(screen.getByText("Invalid password")).toBeInTheDocument();
        });
    });
});
