import { AUTH } from "../constants/actionTypes";
import * as api from "../api";
import { Dispatch } from "react";

export const signin =
  (formData: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
    try {
      // login the user

      setLocation("/");
    } catch (error) {
      console.error(error);
    }
  };

export const signup =
  (formData: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
    try {
      // signup the user

      setLocation("/");
    } catch (error) {
      console.error(error);
    }
  };
