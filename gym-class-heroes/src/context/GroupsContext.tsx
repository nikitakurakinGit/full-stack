import { createContext, useContext, useEffect, useState } from 'react';
import type { GroupsInterface } from '../components/interface/groupsInterface';
import * as groupServices from '../services/groupServices';
const API_URL = import.meta.env.VITE_API_URL; 

interface GroupsContextType {
    groups: GroupsInterface[],
    refreshGroups: () => Promise<void>
}

export const groupsContext = createContext<GroupsContextType | undefined>(undefined);

export function GroupsProvider({ children }: { children: React.ReactNode }) {
    const [groups, setGroups] = useState<GroupsInterface[]>([]);

    const fetchGroups = async () => {
        const data = await groupServices.fetchGroups();
        setGroups(data)
        console.log(data)
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    return(
        <groupsContext.Provider value={{ groups, refreshGroups: fetchGroups }}>
            {children}
        </groupsContext.Provider>
    )
}