import * as React from "react";
import { render } from "react-dom";
// Connects redux with react
// Provider provides the store to all sub components
import { Provider } from "react-redux";
import { store } from "./store/index";
import { StudiesList } from "./components/StudiesList";
import { CompletedStudies } from "./components/CompletedStudies";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <StudiesList />
        <hr />
        <CompletedStudies />
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
