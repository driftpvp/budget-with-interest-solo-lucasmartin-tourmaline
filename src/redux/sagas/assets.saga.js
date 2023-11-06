
import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

//GET
function* getAssetsList() {
    try {
        const assetsResponse = yield axios.get('/api/assets');
        yield put({ type: 'SET_ASSETS', payload: assetsResponse.data});
    } catch (error) {
        console.log('ERROR in getAssetsList', error);
        alert('Something went wrong!');
    }
};

//POST


//PUT


//DELETE



function* assetsSaga() {
    yield takeLatest('FETCH_ASSETS', getAssetsList);
}

export default assetsSaga;