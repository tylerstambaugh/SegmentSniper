import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import { AppRoutes } from "./enums/AppRoutes";
import Routes from "./SegmentSniper.routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import AppStore from "./store/AppStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <QueryClientProvider client={client}>
    <AppStore />
    <Router basename="/">
      <Header />
      <Routes defaultPage={AppRoutes.Home} />
    </Router>
  </QueryClientProvider>
);
