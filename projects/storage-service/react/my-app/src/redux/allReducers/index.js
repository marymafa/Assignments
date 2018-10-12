import { registerBusinesses, businessLocations, businessBlocks, businessUnitTypes, businessUnits } from "../allReducers/reducers";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    registerBusinesses,
    businessLocations,
    businessBlocks,
    businessUnitTypes,
    businessUnits
});
export default rootReducer;