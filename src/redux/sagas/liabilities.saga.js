import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

//GET
function* getLiabilitiesList() {
    try {
        let response = yield axios.get('/api/liabilities');
        yield put({ type: 'SET_LIABILITIES_LIST', payload: response.data});
    } catch (error) {
        console.log('ERROR in getLiabilitiesList', error);
        alert('Something went wrong!');
    }
};

//POST


//PUT


//DELETE

function* liabilitiesSaga() {
    yield takeLatest('FETCH_LIABILITIES_LIST', getLiabilitiesList);
}

export default liabilitiesSaga;