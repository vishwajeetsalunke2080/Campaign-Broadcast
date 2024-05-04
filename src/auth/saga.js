import { all, put, takeEvery, call } from "redux-saga/effects";
import { actions, setLogin, setLoginFail, setResult } from "./action";
import login from "@/pages/api/auth.service";
import { GetModelInfo, CreateModel } from "@/pages/api/trainmodel.service";
import { GetCampaignInfo, CreateCampaign, addCsvData, addVideoData } from "@/pages/api/campaign.service";

function* callLogin(payload) {	
	const res = yield call(login, payload);	
	if (res) {		
		if (res?.data?.data != null) {				
			yield localStorage.setItem("accessToken", res?.data?.data);
			yield localStorage.setItem("username", payload.payload["Username"]);
			yield put(setLogin(payload.payload["Username"]));
		} else {
			yield put(setLoginFail("Something went wrong"));
		}
	}
}

function* GetModels(payload) {	
	const res = yield call(GetModelInfo, payload)
	if (res) {		
		if (res.status == 200) {										
			yield put(setResult(res.data.data));
		} else {
			yield put(setResult(res.message));
		}
	}
}

function* CreateNewModel(payload) {	
	const res = yield call(CreateModel, payload);		
	if (res) {		
		if (res.status == 200) {										
			yield put(setResult("Model Added Successfully"));
		}
		 else {
			yield put(setResult(res.message));
		}
	}
}

function* CreateNewCampaign(payload) {	
	const res = yield call(CreateCampaign, payload);		
	if (res) {		
		if (res.status == 200) {										
			yield put(setResult("Campaign Created Successfully!"));
		} else {
			yield put(setResult("Error while creating campaign"));
		}
	}
}


function* GetCampaignData(payload) {	
	const res = yield call(GetCampaignInfo, payload);	
	if (res) {		
		if (res.status == 200) {										
			yield put(setResult(res));
		} else {
			yield put(setResult(null));
		}
	}
}


function* AddCsvData(payload) {	
	const res = yield call(addCsvData, payload);
	if (res) {
		if (res.status == 200) {			
			yield put(setResult(res.data.data));
		} else {
			yield put(setResult(null));
		}		
	}
}


function* AddVideoData(payload) {	
	const res = yield call(addVideoData, payload);		
	if (res) {		
		if (res.status == 200) {			
			yield put(setResult("Video Added Successfully!"));
		} else {
			yield put(setResult(null));
		}
	}
}


export default function* rootSaga() {
	yield all([takeEvery(actions.CALL_LOGIN, callLogin)]);
	yield all([takeEvery(actions.CREATE_NEW_MODEL, CreateNewModel)]);
	yield all([takeEvery(actions.GET_MODEL_INFO, GetModels)]);
	yield all([takeEvery(actions.CREATE_NEW_CAMPAIGN, CreateNewCampaign)]);
	yield all([takeEvery(actions.GET_CAMPAIGN_DATA, GetCampaignData)]);
	yield all([takeEvery(actions.ADD_VIDEO_DATA, AddVideoData)]);
	yield all([takeEvery(actions.ADD_CSV_DATA, AddCsvData)]);
}
