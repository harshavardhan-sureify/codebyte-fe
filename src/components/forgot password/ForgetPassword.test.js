import { ThemeProvider } from "@emotion/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import store from "../features/store";
import { theme } from "../../themes/theme";
import { act } from "react-dom/test-utils";
import { server } from "../../server";
import Toaster from "../Toaster";

const MockForgotPassword = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Toaster/>
                    <ForgetPassword />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    );
};




describe("ForgotPassword",()=>{
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("Should render helper text for invalid user input",()=>{
        render(<MockForgotPassword/>)
        let email=screen.getByLabelText("Email")
        expect(email).toBeTruthy();
        fireEvent.change(email,{target:{value:"hi"}})
        expect(screen.getByText("Enter valid email")).toBeTruthy()
        fireEvent.change(email,{target:{value:" "}})
        expect(screen.getByText("Email is required")).toBeTruthy()
    })
    test("Should render helper text for invalid user input on submit",()=>{
        render(<MockForgotPassword/>)
        const sendMailButton=screen.getByRole("button",{name:"Continue"})
        fireEvent.click(sendMailButton)
        expect(screen.getByText("Email is required")).toBeTruthy()
    })
    test("Should render error message",async ()=>{
        render(<MockForgotPassword/>)
        const email=screen.getByLabelText("Email")
        fireEvent.change(email,{target:{value:"admin1@gmail.com"}})
        const sendMailButton=screen.getByRole("button",{name:"Continue"})
        await act(async () => {
            fireEvent.click(sendMailButton);
        });

        await waitFor(()=>{
            expect(screen.getByText("user doesn't exist")).toBeTruthy()
        })
        
    })

    test("Should render toaster in case of a error",async ()=>{
        
        render(<MockForgotPassword />)
        const email=screen.getByLabelText("Email")
        fireEvent.change(email,{target:{value:"admin2@gmail.com"}})
        const sendMailButton=screen.getByRole("button",{name:"Continue"})
        await act(async () => {
            fireEvent.click(sendMailButton);
        });

        await waitFor(()=>{
            expect(screen.getByText("Internal server error")).toBeTruthy()
        })
        
    })

})