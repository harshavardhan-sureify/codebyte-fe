import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import store from "./features/store";
import { theme } from "../themes/theme";
import "@testing-library/jest-dom";
import { server } from "../server";
import Toaster from "./Toaster";

const MockLoginPage = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Toaster />
                    <LoginPage />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
};
describe("Test Login Page", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it("Should render the login page correctly", () => {
        render(<MockLoginPage />);
        expect(screen.getByText(/Welcome/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /login/i })
        ).toBeInTheDocument();
    });

    it("Should render error helpertext for invalid user input", () => {
        render(<MockLoginPage />);
        const emailEle = screen.getByPlaceholderText(/Email/);
        const passwordEle = screen.getByPlaceholderText(/Password/);
        fireEvent.change(emailEle, { target: { value: "maniknr" } });
        expect(screen.getByText("Email is not valid")).toBeInTheDocument();

        fireEvent.change(emailEle, { target: { value: "" } });
        expect(screen.getByText("Email is required")).toBeInTheDocument();

        fireEvent.change(passwordEle, { target: { value: "  " } });
        expect(screen.getByText("Password is required")).toBeInTheDocument();

        fireEvent.change(passwordEle, { target: { value: "sdvsvb" } });
        expect(screen.getByText("Invalid password")).toBeInTheDocument();
    });

    it("Should redirect to dashboard on successful login", async () => {
        render(<MockLoginPage />);
        const emailEle = screen.getByPlaceholderText(/Email/);
        const passwordEle = screen.getByPlaceholderText(/Password/);
        const loginBtnEle = screen.getByRole("button", { name: /login/i });
        fireEvent.change(emailEle, { target: { value: "maniknr@gmail.com" } });
        fireEvent.change(passwordEle, { target: { value: "Mani@1234" } });
        fireEvent.click(loginBtnEle);
        await waitFor(async () => {
            expect(window.location.href).toBe(
                "http://localhost/user/dashboard"
            );
        });
    });
    it("Should display user doesn't exist  message on entering invalid email", async () => {
        render(<MockLoginPage />);
        const emailEle = screen.getByPlaceholderText(/Email/);
        const passwordEle = screen.getByPlaceholderText(/Password/);
        screen.getByRole("button", { name: /login/i });
        const loginBtnEle = screen.getByRole("button", { name: /login/i });
        fireEvent.change(emailEle, {
            target: { value: "notexisting@gmail.com" },
        });
        fireEvent.change(passwordEle, { target: { value: "Hello@1234" } });
        fireEvent.click(loginBtnEle);
        await waitFor(async () => {
            expect(screen.getByText("User doesn't exists")).toBeInTheDocument();
        });
    });
    it("Should display incorrect password message on entering wrong password", async () => {
        render(<MockLoginPage />);
        const emailEle = screen.getByPlaceholderText(/Email/);
        const passwordEle = screen.getByPlaceholderText(/Password/);
        const loginBtnEle = screen.getByRole("button", { name: /login/i });
        fireEvent.change(emailEle, {
            target: { value: "dcgythfvujyfcjvmh@gmail.com" },
        });
        fireEvent.change(passwordEle, { target: { value: "Hel@1234" } });
        fireEvent.click(loginBtnEle);
        await waitFor(async () => {
            expect(screen.getByText("Incorrect password")).toBeInTheDocument();
        });
    });
    it("Should render visibility button correctly and work perfectly", async () => {
        render(<MockLoginPage />);
        const passwordEle = screen.getByPlaceholderText(/Password/);
        const visibilityBtnEle = screen.getByTestId("visibilityIcon");
        expect(passwordEle.type).toBe("password");
        fireEvent.click(visibilityBtnEle);
        expect(passwordEle.type).toBe("text");
    });
    it("Should display toaster for unknown error in BE", async () => {
        render(<MockLoginPage />);
        const emailEle = screen.getByPlaceholderText(/Email/);
        const passwordEle = screen.getByPlaceholderText(/Password/);
        const loginBtnEle = screen.getByRole("button", { name: /login/i });
        fireEvent.change(emailEle, {
            target: { value: "servererror@gmail.com" },
        });
        fireEvent.change(passwordEle, {
            target: { value: "Mani@1234" },
        });
        fireEvent.click(loginBtnEle);
        await waitFor(async () => {
            expect(
                screen.getByText("Something went wrong")
            ).toBeInTheDocument();
        });
    });
});
