
export const saveName = (name) => {
    return { type: "NAME", value: name }
};
export const saveContactName = (contact_name) => {
    return { type: "CONTACT_NAME", value: contact_name }
};
export const saveContactEmail = (contact_email) => {
    return { type: "CONTACT_EMAIL", value: contact_email }
};
export const saveContactNumber = (contact_Number) => {
    return { type: "CONTACT_NUMBER", value: contact_Number }
};
export const onSubmit = (data) => {
    return { type: "SUBMIT_VALUES", value: data }
};
export const saveBlockName = (block_name) => {
    return { type: "BLOCK_NAME", value: block_name }
};
export const saveUnitTypesName = (unit_type_name) => {
    return { type: "NAME", value: unit_type_name };
};
export const saveUnitTypesLength = (unit_length) => {
    return { type: "LENGTH", value: unit_length };
};
export const saveUnitTypesHeight = (unit_length) => {
    return { type: "HEIGHT", value: unit_length };
};
export const saveUnitTypesWidth = (unit_width) => {
    return { type: "WIDTH", value: unit_width };
};
export const saveUnits = (unit) => {
    return { type: "NAME", value: unit };
};
export const countryOfTheBusiness = (country) => {
    return { type: "COUNTRY", value: country }

};
export const businessId = (businessid) => {
    return { type: "BUSINESS_ID", value: businessid }
}
export const businessLocation = (address) => {
    return { type: "ADDRESS", value: address }
};
export const saveSelect = (data) => {
    return { type: "ADD_SELECT", value: data }
};
export const saveLocations_Id = (locationid) => {
    return { type: "LOCATION_ID", value: locationid }
};
export const blockId = (blockid) => {
    return { type: "BLOCK_ID", value: blockid }
};
export const unitTypeId = (unitid) => {
    return { type: "UNIT_TYPES_ID", value: unitid }
}