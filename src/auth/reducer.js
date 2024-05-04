import { useReducer } from "react";
import { actions } from "./action";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: false,  
  response:null
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.CALL_LOGIN:
      return {
        ...state,
        ...{
          isLoggedIn: false,
          user: null,
          error: null,
          loading: true,
        },
      };

    case actions.SET_LOGIN:
      return {
        ...state,
        ...{
          isLoggedIn: true,
          user: payload,
          error: null,
          loading: false,
        },
      };

    case actions.SET_LOGIN_FAIL:
      return {
        ...state,
        ...{
          isLoggedIn: false,
          user: null,
          error: payload,
          loading: false,
        },
      };

    case actions.SET_LOGOUT_SUCCESS:
      return {
        ...state,
        ...{
          isLoggedIn: false,
          user: null,
          error: null,
          loading: false,
        },
      };

      case actions.CREATE_NEW_MODEL:        
      return {
        ...state,
        ...{
          loading: true,
        }
      };

      case actions.GET_MODEL_INFO:        
      return {
        ...state,
        ...{
          loading: true,          
        }
      };

      case actions.CREATE_NEW_CAMPAIGN:        
      return {
        ...state,
        ...{
          loading: true,
          response:null,
        }
      };    
      
      case actions.GET_CAMPAIGN_DATA:        
      return {
        ...state,
        ...{    
          loading:true,      
          response:null,
        }
      };      

      case actions.ADD_VIDEO_DATA:        
      return {
        ...state,
        ...{          
          response:null,
          loading:true
        }
      };      

      case actions.ADD_CSV_DATA:        
      return {
        ...state,
        ...{          
          response:null,
          loading:true
        }
      };      

      case actions.SET_REQUEST_RESULT:        
        return {
          ...state,
          ...{
            response:payload,
            loading:false
          },
        };
    default:
      return state;
  }
}

export default reducer;
