import { registerBusinesses, businessLocations, businessBlocks, businessUnitTypes, businessUnits, selectValues, signUpPage } from "../allReducers/reducers";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    registerBusinesses,
    businessLocations,
    businessBlocks,
    businessUnitTypes,
    businessUnits,
    selectValues,
    signUpPage
});
export default rootReducer;