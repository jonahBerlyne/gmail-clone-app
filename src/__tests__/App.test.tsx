import React, { useState } from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
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
    expect(screen.getByTestId("emails4")).toHaveTextContent("44");
    expect(screen.getByTestId("title5")).toHaveTextContent("Sent");
    expect(screen.getByTestId("emails6")).toHaveTextContent("2");
    expect(screen.getByTestId("title7")).toHaveTextContent("Sign out");
    expect(screen.getByTestId("title8")).toHaveTextContent("More");
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
       uid: jest.fn().mockReturnValue("abc"),
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

 it("renders the send mail component and changes its input values", () => {

  const { container } = render(
    <Provider store={store}>
      <SendMail />
    </Provider>
  );

  expect(container).toMatchSnapshot();

  fireEvent.change(screen.getByTestId("to"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("subj"), {target: {value: "example subj"}});
  fireEvent.change(screen.getByTestId("msg"), {target: {value: "This is an example message."}});

  expect(screen.getByTestId("to")).toHaveValue("example@example.com");
  expect(screen.getByTestId("subj")).toHaveValue("example subj");
  expect(screen.getByTestId("msg")).toHaveValue("This is an example message.");
 });

 let emails: any[] = [];

 it("sends emails", () => {

   const EmailScreen = () => {

     const [to, setTo] = useState<string>("");
     const [subject, setSubject] = useState<string>("");
     const [msg, setMsg] = useState<string>("");

     const [month, setMonth] = useState<number>(3);
     const [day, setDay] = useState<number>(5);

     const [id, setId] = useState<number>(1);
     
     const sendEmail = () => {
       const time: string = `0${month}/0${day}/2022`;
       const emailDoc = {
         from: to,
         subject,
         msg,
         time,
         id
       };
       emails.push(emailDoc);
       setMonth(month + 2);
       setDay(day + 2);
       setId(id + 1);
     }

     return (
       <>
        <input data-testid="to" value={to} onChange={(e) => setTo(e.target.value)} />
        <input data-testid="subj" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea data-testid="msg" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button data-testid="sendBtn" onClick={() => sendEmail()}></button>
       </>
     );
   }

   const { rerender } = render(<EmailScreen />);

   fireEvent.change(screen.getByTestId("to"), {target: {value: "example@example.com"}});
   fireEvent.change(screen.getByTestId("subj"), {target: {value: "example subj"}});
   fireEvent.change(screen.getByTestId("msg"), {target: {value: "This is an example message."}});
   fireEvent.click(screen.getByTestId("sendBtn"));

   expect(emails).toHaveLength(1);

   rerender(<EmailScreen />);

   fireEvent.change(screen.getByTestId("to"), {target: {value: "example2@example2.com"}});
   fireEvent.change(screen.getByTestId("subj"), {target: {value: "example subj 2"}});
   fireEvent.change(screen.getByTestId("msg"), {target: {value: "This is another example message."}});
   fireEvent.click(screen.getByTestId("sendBtn"));

   expect(emails).toHaveLength(2);
 });

 it("displays the email row's text values", () => {

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

  render(
   <Provider store={store}>
    <Router>
     <Emails />
    </Router>
   </Provider>
  );

  expect(screen.getByTestId("emailFrom1")).toHaveTextContent("example@example.com");
  expect(screen.getByTestId("subj2")).toHaveTextContent("example subj 2");
  expect(screen.getByTestId("msg1")).toHaveTextContent("This is an example message.");
  expect(screen.getByTestId("time2")).toHaveTextContent("05/07/2022");
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
  expect(screen.getByTestId("mailSubj")).toHaveTextContent("example subj 2");
  expect(screen.getByTestId("mailFrom")).toHaveTextContent("<example2@example2.com>");
  expect(screen.getByTestId("mailTime")).toHaveTextContent("05/07/2022");
  expect(screen.getByTestId("mailMsg")).toHaveTextContent("This is another example message.");
 });
});