import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useAppSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
