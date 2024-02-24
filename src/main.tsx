import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "rc-slider/assets/index.css";
import App from "./App.tsx";
import moment from "moment";
import "moment/dist/locale/ru.js";

moment.locale("ru");

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
