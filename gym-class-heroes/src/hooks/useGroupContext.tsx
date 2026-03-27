import { useContext } from "react";
import { groupsContext } from "../context/GroupsContext";


export function useGroupContext() {
    const context = useContext(groupsContext)

    if (!context) {
        throw new Error("useGroups must be used within a GroupsProvider")
    }

    return context
}