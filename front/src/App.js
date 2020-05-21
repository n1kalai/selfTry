import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Folder from "./pages/Folder";
import Files from "./pages/Files";
import File from "./pages/File";
import Header from "./components/Header";
import Home from "./pages/Home";
import Keywords from "./pages/Keywords";
import Keyword from "./pages/Keyword";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/folder/:id" component={Folder} />
        <Route path="/files" component={Files} />
        <Route path="/file/:id" component={File} />
        <Route path="/keywords" component={Keywords} />
        <Route path="/keyword/:id" component={Keyword} />
        <Route path="/notes" component={Notes} />
        <Route path="/note/:id" component={Note} />
      </Switch>
    </Router>
  );
}

export default App;
