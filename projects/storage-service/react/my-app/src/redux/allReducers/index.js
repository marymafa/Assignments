import { registerBusinesses, businessLocations, businessBlocks, businessUnitTypes, businessUnits, selectValues, signUpPage,loginPage } from "../allReducers/reducers";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    registerBusinesses,
    businessLocations,
    businessBlocks,
    businessUnitTypes,
    businessUnits,
    selectValues,
    signUpPage,
    loginPage
});
export default rootReducer;