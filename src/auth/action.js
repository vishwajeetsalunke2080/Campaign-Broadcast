export const actions = {
	CALL_LOGIN: "CALL_LOGIN",
	SET_LOGIN: "SET_LOGIN",
	SET_LOGIN_FAIL: "SET_LOGIN_FAIL",
	SET_LOGOUT_SUCCESS: "SET_LOGOUT_SUCCESS",
	CREATE_NEW_MODEL: "CREATE_NEW_MODEL",
	SET_REQUEST_RESULT: "SET_REQUEST_RESULT",
	CREATE_NEW_CAMPAIGN: "CREATE_NEW_CAMPAIGN",
	GET_CAMPAIGN_DATA: "GET_CAMPAIGN_DATA",
	ADD_VIDEO_DATA: "ADD_VIDEO_DATA",
	ADD_CSV_DATA: "ADD_CSV_DATA",
	GET_MODEL_INFO: "GET_MODEL_INFO"
};

export function callLogin(data) {	
	return { type: actions.CALL_LOGIN, payload: data };
}

export function callGetModelInfo(){
	return { type: actions.GET_MODEL_INFO };
}

export function callCreateModel(data) {	
	return { type: actions.CREATE_NEW_MODEL, payload: data };
}

export function callCreateCampaign(data) {	
	return { type: actions.CREATE_NEW_CAMPAIGN, payload: data };
}

export function callGetCampaignData(id) {	
	return { type: actions.GET_CAMPAIGN_DATA, payload: id };
}

export function callAddCsvData(data) {	
	return { type: actions.ADD_CSV_DATA, payload: data };
}

export function callAddVideoData(data) {	
	return { type: actions.ADD_VIDEO_DATA, payload: data };
}

export function setLogin(data) {
	return { type: actions.SET_LOGIN, payload: data };
}

export function setResult(data){
	return { type: actions.SET_REQUEST_RESULT, payload: data };
}

export function setLoginFail(error) {
	return { type: actions.SET_LOGIN_FAIL, payload: error };
}
export function setLogoutSuccess() {
	return { type: actions.SET_LOGOUT_SUCCESS };
}
