import { combineReducers } from 'redux';

const assetsList = (state = [], action) => {
    switch(action.type) {
        case 'SET_ASSETS':
            return action.payload;
        default:
            return state;
    }
};

const initialState = {
    sumAssets: 0,
};

const assetsSum = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_SUM_ASSETS':
            return {
                ...state,
                sumAssets: action.payload,
            };
        default:
            return state;
    }
};

  
export default combineReducers({
    assetsList,
    assetsSum,
});


