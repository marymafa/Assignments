import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import BusinessFrom from "./components/businessForm";
import "./app.css";
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <BusinessFrom />
    </Provider>,
    document.getElementById("root")
)