import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth, getAuth } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import EmailListPage from "../Pages/EmailListPage";
import EmailRow from "../Components/EmailRow";
import MailPage from "../Pages/MailPage";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import Sidebar from "../Components/Sidebar/Sidebar";
import SendMail from "../Components/SendMail";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

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

describe("Sidebar", () => {
  const setup = () => {
  
   const { container } = render(
     <Provider store={store}>
       <Router>
         <Sidebar />
       </Router>
     </Provider>
   );
  
   return {
     container
   };
  }
  
  it("renders the sidebar", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  
  it("displays the sidebar's text values", () => {
    setup();
  
    expect(screen.getByTestId("title1")).toHaveTextContent("Inbox");
    expect(screen.getByTestId("emails2")).toHaveTextContent("23");
    expect(screen.getByTestId("title3")).toHaveTextContent("Snoozed");
    expect(screen.getByTestId("emails4")).toHaveTextContent("4");
    expect(screen.getByTestId("title5")).toHaveTextContent("Sent");
    expect(screen.getByTestId("emails6")).toHaveTextContent("2");
    expect(screen.getByTestId("title7")).toHaveTextContent("More");
  });
});

describe("Mail", () => {

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

 it("displays the section titles", () => {
  const mockAuth = ({
   currentUser: {
       uid: "abc",
   }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);

  render(
   <Provider store={store}>
    <Router>
     <EmailListPage />
    </Router>
   </Provider>
  );

  expect(screen.getByTestId("sectionTitle1")).toHaveTextContent("Primary");
  expect(screen.getByTestId("sectionTitle2")).toHaveTextContent("Social");
  expect(screen.getByTestId("sectionTitle3")).toHaveTextContent("Promotions");
 });

 it("renders the send mail component", () => {

  const { container } = render(
    <Provider store={store}>
      <SendMail />
    </Provider>
  );

  expect(container).toMatchSnapshot();

  fireEvent.change(screen.getByTestId("to"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("subj"), {target: {value: "example subj"}});
  fireEvent.change(screen.getByTestId("msg"), {target: {value: "This is an example message."}});
 });

 it("changes the send mail component's input values and sends emails", async () => {

  const mockAuth = ({
   currentUser: {
       uid: "abc",
   }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
   
  (collection as jest.Mock).mockReturnThis();
  (serverTimestamp as jest.Mock).mockReturnThis();
  (addDoc as jest.Mock).mockResolvedValue(this);
   
  render(
     <Provider store={store}>
      <SendMail />
    </Provider>
  );
  
  fireEvent.change(screen.getByTestId("to"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("subj"), {target: {value: "example subj"}});
  fireEvent.change(screen.getByTestId("msg"), {target: {value: "This is an example message."}});
  
  expect(screen.getByTestId("to")).toHaveValue("example@example.com");
  expect(screen.getByTestId("subj")).toHaveValue("example subj");
  expect(screen.getByTestId("msg")).toHaveValue("This is an example message.");
  
  fireEvent.click(screen.getByTestId("sendMailBtn"));

  await waitFor(() => {
    expect(addDoc).toBeCalled();
  });
 });

 let emails: any[] = [
  {
   from: "example@example.com",
   id: 1,
   msg: "This is an example msg.",
   subject: "example",
   time: "05/07/2022"
  },
  {
   from: "example2@example2.com",
   id: 2,
   msg: "This is another example msg.",
   subject: "example2",
   time: "07/09/2022"
  },
 ];

 const Emails = () => {
  return (
   <>
    {emails.map(email => {
      return (
       <EmailRow 
        from={email.from}
        subject={email.subject}
        msg={email.msg}
        time={email.time}
        key={email.id}
        id={email.id}
       />
      );
    })}
   </>
  );
 }

 it("displays the email row's text values", () => {

  const {container} = render(
   <Provider store={store}>
    <Router>
     <Emails />
    </Router>
   </Provider>
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByTestId("emailFrom2")).toHaveTextContent("example2@example2.com");
  expect(screen.getByTestId("subj1")).toHaveTextContent("example");
  expect(screen.getByTestId("msg2")).toHaveTextContent("This is another example msg.");
  expect(screen.getByTestId("time1")).toHaveTextContent("05/07/2022");
 });

 it("deletes an email", async () => {
  const mockAuth = ({
   currentUser: {
       email: jest.fn().mockReturnValue("example@example.com"),
   }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (doc as jest.Mock).mockReturnThis();
  (deleteDoc as jest.Mock).mockResolvedValue(this);

  render(
   <Provider store={store}>
    <Router>
     <Emails />
    </Router>
   </Provider>
  );

  fireEvent.click(screen.getByTestId("deleteEmailBtn1"));

  await waitFor(() => {
    expect(deleteDoc).toBeCalled();
  });

 });

 it("renders the mail page and displays the mail page's text values", () => {
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
    mail: {
      sendMessageIsOpen: false,
      selectedMail: emails[1]
    },
    user: {
     user: null
    }
  });

  const { container } = render(
    <Provider store={store}>
      <Router>
        <MailPage />
      </Router>
    </Provider>
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByTestId("mailSubj")).toHaveTextContent("example2");
  expect(screen.getByTestId("mailFrom")).toHaveTextContent("<example2@example2.com>");
  expect(screen.getByTestId("mailTime")).toHaveTextContent("07/09/2022");
  expect(screen.getByTestId("mailMsg")).toHaveTextContent("This is another example msg.");
 });
});