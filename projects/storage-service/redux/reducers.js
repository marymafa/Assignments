const newState = {
    name: "",
    contact_name: "",
    contact_email: "",
    contact_number: "",
}
const reducers = (state = newState, action) => {
    let newState = state;
    switch (action.type) {
        case "NAME":
            newState = { ...state, name: action.value };
            break;
        case "  CONTACT_NAME":
            newState = { ...state, contact_name: action.value };
            break;
        case "CONTACT_EMAIL":
            newState = { ...state, contact_email: action.value };
            break;
        case "CONTACT_EMAIL":
            newState = { ...state, contact_number: action.value }

    }
    return newState;

}
export default reducers