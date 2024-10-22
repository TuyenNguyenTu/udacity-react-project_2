import { render, screen } from "@testing-library/react";
import QuestionCardItem from "./QuestionCardItem";
import { BrowserRouter } from "react-router-dom";

describe("QuestionCard Test", () => {
  test("should render the component", () => {
    const view = render(
      <BrowserRouter>
        <QuestionCardItem
          id="8xf0y6ziyjabvozdd253nd"
          author="billiejean"
          timestamp="1654166872634"
        />
      </BrowserRouter>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
     const authorElement = screen.getByTestId("author");

     expect(authorElement.textContent).toBe("billiejean");
  });

  test("should display all elements", () => {
     render(
      <BrowserRouter>
        <QuestionCardItem
          id="8xf0y6ziyjabvozdd253nd"
          author="billiejean"
          timestamp="1654166872634"
        />
      </BrowserRouter>
    );
    const authorElement = screen.getByTestId("author");

    expect(authorElement.textContent).toBe("billiejean");
  });
});
