import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "./App.css";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import { AppRoutes } from "./enums/AppRoutes";
import Routes from "./SegmentSniper.routes";
import { Container } from "react-bootstrap";

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Router basename="/">
      <Header />
      <Routes defaultPage={AppRoutes.Home} />
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
