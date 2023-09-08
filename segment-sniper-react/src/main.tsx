import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Routes from "./SegmentSniper.routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createRoot } from "react-dom/client";
import AppStore from "./store/AppStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const client = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <QueryClientProvider client={client}>
    <AppStore />
    <Toaster />
    <Router basename="/">
      <Header />
      <Routes />
    </Router>
  </QueryClientProvider>
);
