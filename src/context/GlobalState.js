import React, { createContext, useReducer } from "react";
import { getSavedStates } from "../utils/storeStates";

const initialState = { id: 0, email: "", name: "", city: "", lat: "", lon: "", isLogin: false };

const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":      
      return {...action.payload};
    case "USER_SEARCH_WEATHER":
      return {...action.payload};
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
const { id, email, name, city, lat, lon, isLogin } = initialState;
const savedState = getSavedStates({ id, email, name, city, lat, lon, isLogin });
export const GlobalContext = createContext(savedState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, savedState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};