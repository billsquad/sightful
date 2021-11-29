import { AUTH } from "../constants/actionTypes";
import * as api from "../api";
import { Dispatch } from "react";

export const signin =
  (formData: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });

      setLocation("/");
    } catch (error) {
      // @ts-ignore
      console.error(error.message);
    }
  };

export const signup =
  (formData: any, setLocation: any) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: AUTH, data });

      setLocation("/");
    } catch (error) {
      console.error(error);
    }
  };
