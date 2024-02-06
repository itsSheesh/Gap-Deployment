import { createContext, useState } from "react";

export const SelectedConversation = createContext();

export const SelectedConversationProvider = ({ children }) => {
    const [isSelectedConversation, setIsSelectedConversation] = useState(false);

    return (
        <SelectedConversation.Provider value={{isSelectedConversation, setIsSelectedConversation}}>
            {children}
        </SelectedConversation.Provider>
    )
};