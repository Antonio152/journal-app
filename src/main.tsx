import React from "react";
import ReactDOM from "react-dom/client";
import { JournalApp } from "./JournalApp";
import "./styles.css";
import "sweetalert2/dist/sweetalert2.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

/* 
!Important:
BrowserRouter is not compatible with GithubPages, so we use HashRouter instead.
https://reinhart1010.id/blog/2021/12/31/error-404-when-using-github-when-i-reload-the-page/
https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
https://robiul-hassan.medium.com/reactjs-gh-page-hard-refresh-issue-404-not-found-ed7954a6d042
*/
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <JournalApp />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
