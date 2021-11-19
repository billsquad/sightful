import { combineReducers } from "redux";

import authReducer from "./auth";
import articleReducer from "./articles";

export default combineReducers({ authReducer, articleReducer });
