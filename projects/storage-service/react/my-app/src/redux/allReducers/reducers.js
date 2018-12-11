
export const registerBusinesses = (state = { name: "", contact_name: "", contact_email: "", contact_number: "" }, action) => {
    let newState = state
    switch (action.type) {
        case "NAME":
            newState = { ...state, name: action.value };
            break;
        case "CONTACT_NAME":
            newState = { ...state, contact_name: action.value };
            break;
        case "CONTACT_EMAIL":
    }
    return newState;
};

export const businessLocations = (state = { address: "", country: "", businesses_id: '' }, action) => {
    let newState = state
    switch (action.type) {
        case "ADDRESS":
            newState = { ...state, address: action.value };
            break;
        case "COUNTRY":
            newState = { ...state, country: action.value };
            break;
        case "BUSINESS_ID":
            newState = { ...state, businesses_id: action.value };
            console.log("business id");
            break;
    }
    return newState;
};

export const businessBlocks = (state = { name: "", locations_id: '' }, action) => {
    let newState = state;
    switch (action.type) {
        case "BLOCK_NAME":
            newState = { ...state, name: action.value };
            break;
        case "LOCATION_ID":
            newState = { ...state, locations_id: action.value };
            break;
    }
    return newState;
};

export const businessUnitTypes = (state = { name: "", length: "", height: "", width: "" }, action) => {
    let newState = state;
    switch (action.type) {
        case "NAME":
            newState = { ...state, name: action.value };
            break;
        case "LENGTH":
            newState = { ...state, length: action.value };
            break;
        case "HEIGHT":
            newState = { ...state, height: action.value };
            break;
        case "WIDTH":
            newState = { ...state, width: action.value };
    }
    return newState;
};

export const businessUnits = (state = { name: "", blocks_id: "", units_type_id: "" }, action) => {
    let newState = state;
    switch (action.type) {
        case "NAME":
            newState = { ...state, name: action.value };
            break;
        case "BLOCK_ID":
            newState = { ...state, blocks_id: action.value };
            break;
        case "UNIT_TYPES_ID":
            newState = { ...state, units_type_id: action.value };
            break;
    }
    return newState;
};

export const selectValues = (state = { selections: '' }, action) => {
    let newState = state;
    switch (action.type) {
        case "ADD_SELECT":
            newState = { ...state, selections: action.value };
            break;
    }
    return newState;

};

export const signUpPage = (state = { username: "", email: "", password: "" }, action) => {
    let newState = state;
    switch (action.type) {
        case "ADD_USER_NAME":
            newState = { ...state, username: action.value };
            console.log("name", newState);
            break;
        case "ADD_EMAIL":
            newState = { ...state, email: action.value };
            console.log("email", newState);
            break;
        case "ADD_PASSWORD":
            newState = { ...state, password: action.value };
            console.log("password", newState);
            break;
    }
    return newState;
}

export const loginPage = (state = { email: "", password: "" }, action) => {
    let newState = state;
    switch (action.type) {
        case "CONFIRM_EMAIL":
            newState = { ...state, email: action.value };
            console.log(" login email", newState);
            break;
        case "CONFIRM_PASSWORD":
            newState = { ...state, password: action.value };
            console.log("password", newState);
            break;
    }
    return newState;
}
const initialState = {
    auth: { loggedIn: false }
};
// export const logoutUser = (state = initialState, action) => {
//     let newState = state;
//     switch (action.type) {
//         case "LOGIN":
//             return {
//         ...state, auth:{loggedIn:true}
//             }
//         case "LOGOUT":
//             return {
//                 ...state, auth:{loggedIn:true}
//             }
//         default: return state
//     }
// }
