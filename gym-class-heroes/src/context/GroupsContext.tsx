import { createContext, useContext, useEffect, useState } from 'react';
import type { GroupsInterface } from '../components/interface/groupsInterface';

interface GroupsContextType {
    groups: GroupsInterface[],
    refreshGroups: () => Promise<void>
}

export const groupsContext = createContext<GroupsContextType | undefined>(undefined);

export function GroupsProvider({ children }: { children: React.ReactNode }) {
    const [groups, setGroups] = useState<GroupsInterface[]>([]);

    const fetchGroups = async () => {
        const res = await fetch("groups fetch")
        const data = await res.json()
        setGroups(data)
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