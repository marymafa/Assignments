import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import BusinessFrom from "./components/businessForm";
import BlockForm from "./components/blockForm";
import LocationForm from "./components/locationForm";
import UnitsFrom from "./components/unitsFrom";
import UnitTypesFrom from "./components/unitTypesForm";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./app.css";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path='/businesses' component={BusinessFrom} />
                <Route path='/blocks' component={BlockForm} />
                <Route path='/locations' component={LocationForm} />
                <Route path='/units' component={UnitsFrom} />
                <Route path='/unit_types' component={UnitTypesFrom} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
)