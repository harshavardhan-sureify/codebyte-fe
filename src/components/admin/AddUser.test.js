import { Provider } from "react-redux";
import store from "../features/store";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../themes/theme";
import Toaster from "../Toaster";
import { BrowserRouter } from "react-router-dom";
import { server } from "../../server";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddUser from "./AddUser";
import { act } from "react-dom/test-utils";
import { ADD_USER_URL } from "../../constants";
import { rest } from "msw";

const MockAddUser = ({ toast }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Toaster />
                    <AddUser toast={toast} />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
};

describe("Test AddUser Page", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it("Should render add user page correctly", () => {
        render(<MockAddUser />);
        expect(screen.getByText("Add User")).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /add/i })
        ).toBeInTheDocument();
    });
    it("Should render error helpertext for invalid user input", () => {
        render(<MockAddUser />);
        const nameEle = screen.getByLabelText("Name");
        const emailEle = screen.getByLabelText("Email");
        fireEvent.change(nameEle, { target: { value: "d" } });
        expect(
            screen.getByText("Name should consist of atleast 3 characters")
        ).toBeInTheDocument();
        fireEvent.change(nameEle, { target: { value: "dwdw3" } });
        expect(
            screen.getByText("Name should consists of only characters")
        ).toBeInTheDocument();
        fireEvent.change(emailEle, {
            target: { value: "dkjvhnifvhfi@hkdcdkc" },
        });
        expect(
            screen.getByText("Please enter a valid email address")
        ).toBeInTheDocument();
    });

    it("Should successfully add the user on valid user data", async () => {
        const dummy = () => {};
        render(<MockAddUser toast={dummy} />);
        const nameEle = screen.getByLabelText("Name");
        const emailEle = screen.getByLabelText("Email");
        const addBtnELe = screen.getByRole("button", { name: /add/i });
        fireEvent.change(nameEle, { target: { value: "dummy" } });
        fireEvent.change(emailEle, {
            target: { value: "dummy@gmail.com" },
        });
        await act(() => {
            fireEvent.click(addBtnELe);
        });
    });
    it("Should render error text on pressing submit without valid data", async () => {
        render(<MockAddUser />);
        const addBtnELe = screen.getByRole("button", { name: /add/i });
        fireEvent.click(addBtnELe);
    });
    it("Should render toaster on internal server error", async () => {
        server.use(
            rest.post(ADD_USER_URL, async (req, res, ctx) => {
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
        const dummy = () => {};
        render(<MockAddUser toast={dummy} />);
        const nameEle = screen.getByLabelText("Name");
        const emailEle = screen.getByLabelText("Email");
        const addBtnELe = screen.getByRole("button", { name: /add/i });
        fireEvent.change(nameEle, { target: { value: "dummy" } });
        fireEvent.change(emailEle, {
            target: { value: "dummy@gmail.com" },
        });

        await act(() => {
            fireEvent.click(addBtnELe);
        });
        expect(screen.getByText(/internal/i)).toBeInTheDocument();
    });
    it("Should render error text on entering a single field and pressing submit", async () => {
        const dummy = () => {};
        render(<MockAddUser toast={dummy} />);
        const nameEle = screen.getByLabelText("Name");
        const addBtnELe = screen.getByRole("button", { name: /add/i });
        fireEvent.change(nameEle, { target: { value: "dummy" } });
        fireEvent.click(addBtnELe);
        expect(screen.getByText("Enter valid details")).toBeInTheDocument();
    });
    it("Should render user already exists error on using existing user email", async () => {
        server.use(
            rest.post(ADD_USER_URL, async (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        status: 400,
                        message: "User already exists",
                        data: null,
                    })
                );
            })
        );
        const dummy = () => {};
        render(<MockAddUser toast={dummy} />);
        const nameEle = screen.getByLabelText("Name");
        const emailEle = screen.getByLabelText("Email");
        const addBtnELe = screen.getByRole("button", { name: /add/i });
        fireEvent.change(nameEle, { target: { value: "dummy" } });
        fireEvent.change(emailEle, {
            target: { value: "dummy@gmail.com" },
        });

        await act(() => {
            fireEvent.click(addBtnELe);
        });
        expect(screen.getByText(/User already exists/i)).toBeInTheDocument();
    });
});
