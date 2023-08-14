import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "../server";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store";
import SignupPage from "./SignupPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "../themes/theme";
import { act } from "react-dom/test-utils";
import { rest } from "msw";
import { SIGNUP_URL } from "../constants";
import Toaster from "./Toaster";

const MockLogin = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Toaster />
                    <SignupPage />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

describe("SignUp page", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("Should render helper text for invalid user input", () => {
        render(<MockLogin />);
        const userNameField = screen.getByLabelText("Name");
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const confirmPasswordField = screen.getByLabelText("Confirm Password");
        expect(userNameField).toBeTruthy();
        expect(emailField).toBeTruthy();
        expect(passwordField).toBeTruthy();
        expect(confirmPasswordField).toBeTruthy();
        fireEvent.change(userNameField, { target: { value: "t12" } });
        fireEvent.change(emailField, { target: { value: "invalid" } });
        fireEvent.change(passwordField, { target: { value: "invalid" } });
        fireEvent.change(confirmPasswordField, { target: { value: "eeeee" } });
        expect(
            screen.getByText("Name should consists of only characters")
        ).toBeTruthy();
        expect(screen.getByText("Email is not valid")).toBeTruthy();
        expect(
            screen.getByText("Password length should be atleast 8 characacters")
        ).toBeTruthy();
        expect(screen.getByText("Password doesn't match")).toBeTruthy();
        fireEvent.change(userNameField, { target: { value: "dd" } });
        expect(
            screen.getByText("Name should contain atleast 3 characters")
        ).toBeTruthy();
        fireEvent.change(passwordField, { target: { value: "1234567898" } });
        expect(
            screen.getByText(
                "Password must contain atleast one upper,one lower,one digit and one special character"
            )
        ).toBeTruthy();
    });

    test("Should render helper text for invalid user input", async () => {
        render(<MockLogin />);
        const submitButton = screen.getByRole("button", {
            name: "Create account",
        });
        await act(async () => {
            fireEvent.click(submitButton);
        });
        expect(screen.getByText("Name is required")).toBeTruthy();
        expect(screen.getByText("Email is required")).toBeTruthy();
        expect(screen.getByText("Password is required")).toBeTruthy();
        expect(screen.getByText("Confirm password is required")).toBeTruthy();
    });

    test("Should render success message on valid user input", async () => {
        render(<MockLogin />);
        const userNameField = screen.getByLabelText("Name");
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const confirmPasswordField = screen.getByLabelText("Confirm Password");
        fireEvent.change(userNameField, { target: { value: "TestUser" } });
        fireEvent.change(emailField, {
            target: { value: "TestUser@gmail.com" },
        });
        fireEvent.change(passwordField, { target: { value: "Hello@123" } });
        fireEvent.change(confirmPasswordField, {
            target: { value: "Hello@123" },
        });
        const submitButton = screen.getByRole("button", {
            name: "Create account",
        });
        await act(async () => {
            fireEvent.click(submitButton);
        });
        await waitFor(() => {
            expect(window.location.href).toBe(
                "http://localhost/user/dashboard"
            );
        });
    });

    test("Should render success user already exists on valid user input", async () => {
        render(<MockLogin />);
        const userNameField = screen.getByLabelText("Name");
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const confirmPasswordField = screen.getByLabelText("Confirm Password");
        fireEvent.change(userNameField, { target: { value: "TestUser" } });
        fireEvent.change(emailField, {
            target: { value: "invalid@user.com" },
        });
        fireEvent.change(passwordField, { target: { value: "Hello@123" } });
        fireEvent.change(confirmPasswordField, {
            target: { value: "Hello@123" },
        });
        const submitButton = screen.getByRole("button", {
            name: "Create account",
        });
        await act(async () => {
            fireEvent.click(submitButton);
        });
        expect(screen.getByText("User already exists")).toBeTruthy();
    });

    test("Should render nternal server error user already exists on valid user input", async () => {
        server.use(
            rest.post(SIGNUP_URL, async (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({
                        status: 500,
                        message: "Internal server error",
                        data: null,
                    })
                );
            })
        );
        render(<MockLogin />);
        const userNameField = screen.getByLabelText("Name");
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const confirmPasswordField = screen.getByLabelText("Confirm Password");
        fireEvent.change(userNameField, { target: { value: "TestUser" } });
        fireEvent.change(emailField, {
            target: { value: "error@user.com" },
        });
        fireEvent.change(passwordField, { target: { value: "Hello@123" } });
        fireEvent.change(confirmPasswordField, {
            target: { value: "Hello@123" },
        });
        const submitButton = screen.getByRole("button", {
            name: "Create account",
        });
        await act(async () => {
            fireEvent.click(submitButton);
        });
        await waitFor(() => {
            expect(screen.getByText("Internal server error")).toBeTruthy();
        });
    });

    test("input password should be visible when password-visibilty icon is clicked and hidden when password-visibilityOff icon is clicked", () => {
        render(<MockLogin />);
        const passwordTextField = screen.getByLabelText("Password");
        fireEvent.click(screen.getByTestId("VisibilityOffIcon"));
        expect(passwordTextField.getAttribute("type")).toBe("text");
        fireEvent.click(screen.getByTestId("VisibilityIcon"));
        expect(passwordTextField.getAttribute("type")).toBe("password");
    });
});
