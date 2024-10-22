import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import NewQuestionItem from "./NewQuestionItem";

describe("NewQuestionItem Test", () => {
  test("should render the component", () => {
    const view = render(
      <BrowserRouter>
        <Provider store={store}>
          <NewQuestionItem />
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
          <NewQuestionItem />
        </Provider>
      </BrowserRouter>
    );

    const optionOneInputElement = screen.getByTestId("OptionOne");
    const optionTwoInputElement = screen.getByTestId("OptionTwo");

    fireEvent.change(optionOneInputElement, { target: { value: "test 1" } });
    fireEvent.change(optionTwoInputElement, {
      target: { value: "test 2" },
    });
    expect(optionOneInputElement.value).toBe("test 1");
    expect(optionTwoInputElement.value).toBe("test 2");
  });
});
