import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import Login from "./LoginPage";

describe("NewQuestionItem Test", () => {
  test("should render the component", () => {
    const view = render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  test("should render correct data", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    const UserNameInputElement = screen.getByTestId("Username");
    const PasswordInputElement = screen.getByTestId("Password");

    fireEvent.change(UserNameInputElement, { target: { value: "Username" } });
    fireEvent.change(PasswordInputElement, {
      target: { value: "Password" },
    });
    expect(UserNameInputElement.value).toBe("Username");
    expect(PasswordInputElement.value).toBe("Password");
  });

  test("should display message when user name incorrect", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    const UserNameInputElement = screen.getByTestId("Username");
    const PasswordInputElement = screen.getByTestId("Password");
    const submitButtonElement = screen.getByTestId("buttonSubmit");
    const errorMessageElement = screen.getByTestId("errorMessage");
    fireEvent.change(UserNameInputElement, {
      target: { value: "" },
    });
    fireEvent.change(PasswordInputElement, {
      target: { value: "Password" },
    });
    fireEvent.click(submitButtonElement);
    expect(UserNameInputElement.value).toBe("");
    expect(PasswordInputElement.value).toBe("Password");
    setTimeout(() => {
      expect(errorMessageElement.value).toBe("username cannot empty");
    });
  });
});
