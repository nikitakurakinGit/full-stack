import { createContext, useContext, useEffect, useState } from 'react';
import type { GroupsInterface } from '../components/interface/groupsInterface';
import * as groupServices from '../services/groupServices';

interface GroupsContextType {
    groups: GroupsInterface[],
    refreshGroups: () => Promise<void>
}

export const groupsContext = createContext<GroupsContextType | undefined>(undefined);

export function GroupsProvider({ children }: { children: React.ReactNode }) {
    const [groups, setGroups] = useState<GroupsInterface[]>([]);

    const fetchGroups = async () => {
        const data = await groupServices.fetchGroups();
        setGroups([...data])
        console.log("groups updated", data)
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