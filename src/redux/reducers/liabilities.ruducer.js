const liabilitiesList = (state = [], action) => {
    switch(action.type) {
        case 'SET_LIABILITIES_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default liabilitiesList;