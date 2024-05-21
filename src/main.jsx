import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { pdfjs } from "react-pdf";
import "./index.css";
import { CssBaseline } from "@mui/material";
import SelectTextProvider from "./Providers/SelectTextProvider.jsx";
import Layout from "./Layout.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SelectTextProvider>
      <CssBaseline />
      <Layout>
        <App />
      </Layout>
    </SelectTextProvider>
  </>
);
