
import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

//GET
function* getLiabilitiesList() {
    try {
        const liabilitiesResponse = yield axios.get('/api/liabilities');
        yield put({ type: 'SET_LIABILITIES', payload: liabilitiesResponse.data});
    } catch (error) {
        console.log('ERROR in getLiabilitiesList', error);
        alert('Something went wrong!');
    }
};

//POST


//PUT


//DELETE



function* liabilitiesSaga() {
    yield takeLatest('FETCH_LIABILITIES', getLiabilitiesList);
}

export default liabilitiesSaga;