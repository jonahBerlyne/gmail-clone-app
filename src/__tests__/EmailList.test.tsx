import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth, getAuth } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import EmailListPage from "../Pages/EmailListPage";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn()
  };
});

jest.mock("firebase/firestore");

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Email List Page", () => {

 it("renders the email list page", () => {

  const mockAuth = ({
   currentUser: {
       uid: jest.fn().mockReturnValue("abc"),
   }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  
  const { container } = render(
   <Provider store={store}>
    <Router>
     <EmailListPage />
    </Router>
   </Provider>
  );
  expect(container).toMatchSnapshot();
 });
});