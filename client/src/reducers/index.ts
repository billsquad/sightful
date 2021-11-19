import { combineReducers } from "redux";

import articleReducer from "./articles";
import authReducer from "./auth";

export default combineReducers({ articleReducer, authReducer });
