import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../Pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth, getAuth, signInWithEmailAndPassword, signInWithPopup, UserCredential } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "../Redux/store";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock("firebase/auth");

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Login Page", () => {

 it("renders the login page", () => {
  const { container } = render(
   <Provider store={store}>
    <Router>
     <LoginPage />
    </Router>
   </Provider>
  );
  expect(container).toMatchSnapshot();
 });

 it("should login user", async () => {
  const mockCredential = ({
   user: {
    email: "example@example.com",
    displayName: "example",
    photoURL: "example.png"
   }
  } as unknown) as UserCredential;

  (signInWithPopup as jest.Mock).mockResolvedValue(mockCredential);

  render(
   <Provider store={store}>
    <Router>
     <LoginPage />
    </Router>
   </Provider>
  );

  fireEvent.click(screen.getByTestId("loginBtn"));

  await waitFor(() => {
    expect(signInWithPopup).toBeCalled();
  });
 });

});