import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import BusinessFrom from "./components/businessForm";
import BlockForm from "./components/blockForm";
import LocationForm from "./components/locationForm";
import UnitsFrom from "./components/unitsFrom";
import UnitTypesFrom from "./components/unitTypesForm";
import viewData from "./components/viewData";
import { Provider } from 'react-redux';
import ViewLocations from "./components/viewLocations";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
                <Route path='/view_business' component={viewData} />
                <Route path='/view_locations' component={ViewLocations} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
)