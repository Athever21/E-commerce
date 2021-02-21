import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import {ApolloClient, InMemoryCache,ApolloProvider} from "@apollo/client";
import {user_url} from"./config";

const client = new ApolloClient({
  uri: user_url,
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);