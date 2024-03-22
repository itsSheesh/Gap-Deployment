import { createContext, useState } from "react";

const ConversationContext = createContext();

export const SelectedConversationProvider = ({ children }) => {
    const [isSelectedConversation, setIsSelectedConversation] = useState(false);

    return (
        <ConversationContext.Provider value={{isSelectedConversation, setIsSelectedConversation}}>
            {children}
        </ConversationContext.Provider>
    )
};

export default ConversationContext