import { registerBusinesses, businessLocations, businessBlocks, businessUnitTypes, businessUnits, selectValues } from "../allReducers/reducers";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    registerBusinesses,
    businessLocations,
    businessBlocks,
    businessUnitTypes,
    businessUnits,
    selectValues

});
export default rootReducer;