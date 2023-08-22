import { ThemeProvider } from "@emotion/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ALL_USERS_URL } from "../../constants";
import { server } from "../../server";
import { theme } from "../../themes/theme";
import store from "../features/store";
import Toaster from "../Toaster";
import AllUsers from "./AllUsers";

const MockAllUsers = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Toaster />
          <AllUsers />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe("All users component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should render search result based on search input", async () => {
    render(<MockAllUsers />);
    await waitFor(() => {
      let search = screen.getByLabelText("Search");
      fireEvent.change(search, { target: { value: "s harsha" } });
      expect(screen.getByText("s harsha")).toBeTruthy();
      fireEvent.focus(search);
      let CancelIcon = screen.getByTestId("ClearIcon");
      fireEvent.click(CancelIcon);
    });
  });

  test("should render inactive users", async () => {
    render(<MockAllUsers />);
    await waitFor(() => {
      let Inactive = screen.getByRole("tab", { name: "Inactive" });
      fireEvent.click(Inactive);
      expect(screen.getByText("chandhu")).toBeTruthy();
    });
  });

  test("should render the delete user model", async () => {
    render(<MockAllUsers />);
    await waitFor(() => {
      let DeleteButton = screen.getByRole("button", { name: "Delete user" });
      fireEvent.click(DeleteButton);
      expect(
        screen.getByText("Are you sure want to delete the user s harsha?")
      ).toBeTruthy();
      let YesButton = screen.getByRole("button", { name: "yes" });
      fireEvent.click(YesButton);
    });
  });

  test("should render the toaster after deleting a user", async () => {
    render(<MockAllUsers />);
    await waitFor(() => {
      let Inactive = screen.getByRole("tab", { name: "Inactive" });
      fireEvent.click(Inactive);
      let RestoreButton = screen.getByTestId("RestoreIcon");
      fireEvent.click(RestoreButton);
      let YesButton = screen.getByRole("button", { name: "yes" });
      fireEvent.click(YesButton);
      expect(screen.getByText("User status changed successfully")).toBeTruthy()
    });
  });

  test("Should render toaster in case of a error", async () => {
    server.use(
      rest.get(ALL_USERS_URL, async (req, res, ctx) => {
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
    render(<MockAllUsers />);
    await waitFor(() => {
      expect(screen.getByText("Internal Server Error")).toBeTruthy();
    });
  });
  test("should render same page in case of no to delete user", async () => {
    render(<MockAllUsers />);
    await waitFor(() => {
      let DeleteButton = screen.getByRole("button", { name: "Delete user" });
      fireEvent.click(DeleteButton);
      let NoButton = screen.getByRole("button", { name: "no" });
      fireEvent.click(NoButton);
    });
  });
});
