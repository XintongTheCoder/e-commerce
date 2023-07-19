import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import App from "./components/App.jsx";
import store from "./store";

const client = new ApolloClient({
  uri: "/graphql/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
