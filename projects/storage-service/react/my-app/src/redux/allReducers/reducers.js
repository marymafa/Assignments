

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
            newState = { ...state, contact_email: action.value };
            break;
        case "CONTACT_NUMBER":
            newState = { ...state, contact_number: action.value };
            break;
        case "SUBMIT_VALUES":
            newState = { ...state, name: action.value, contact_name: action.value, contact_email: action.value, contact_number: action.value }
            break;
    }
    return newState;
};
export const businessLocations = (state = { address: "", country: "", businesses_id: "" }, action) => {
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
            break;
    }
    return newState;
};
export const businessBlocks = (state = { name: "" }, action) => {
    let newState = state;
    switch (action.type) {
        case "BLOCK_NAME":
            newState = { ...state, name: action.value }
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
}
export const businessUnits = (state = { name: "" }, action) => {
    let newState = state;
    switch (action.type) {
        case "NAME":
            newState = { ...state, name: action.value };
            break;
    }
    return newState;
}



