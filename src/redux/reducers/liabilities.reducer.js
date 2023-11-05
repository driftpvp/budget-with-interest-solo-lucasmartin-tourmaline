import { combineReducers } from 'redux';

const liabilitiesList = (state = [], action) => {
    switch(action.type) {
        case 'SET_LIABILITIES':
            return action.payload;
        default:
            return state;
    }
};

const initialState = {
    sumLiabilities: 0,
};

const liabilitiesSum = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_SUM_LIABILITIES':
            return {
                ...state,
                sumLiabilities: action.payload,
            };
        default:
            return state;
    }
};

  
export default combineReducers({
    liabilitiesList,
    liabilitiesSum,
});


