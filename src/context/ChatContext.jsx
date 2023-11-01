import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const {currentUser} = useContext(AuthContext);


    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    }

    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: [action.payload.uid, currentUser.uid].sort().join(':')
                };
            
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
        {children}
        </ChatContext.Provider>
    )
}