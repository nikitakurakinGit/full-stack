import type { addToGroup } from "../components/interface/addToGroupInterface";
import type { GroupsInterface } from "../components/interface/groupsInterface";
import { groupData } from "../data/groupsData";


export function fetchGroups() {
    return groupData;
}

export function addToGroup({groupId, key, subjectId}: addToGroup) {
    const groups: GroupsInterface[] = fetchGroups()

    const updatedGroups = groups.map(group => 
        group.id === groupId ? {
            ...group,
            [key]: [...group[key], subjectId]
        }: group
    )

    return updatedGroups;
}

export function removeFromGroup({groupId, key, subjectId}: addToGroup) {
    const groups: GroupsInterface[] = fetchGroups()

    const updatedGroups = groups.map(group => 
        group.id === groupId ? {
            ...group,
            [key]: [...group[key].filter(id => id !== subjectId)]
        }: group
    )

    return updatedGroups;
}