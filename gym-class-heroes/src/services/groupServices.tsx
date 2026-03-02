import * as groupServices from '../apis/groupsRepo';
import type { addToGroup } from "../components/interface/addToGroupInterface";

export async function fetchGroups() {
    const groups = await groupServices.fetchGroups()
    return groups
}

export async function addToGroup(data: addToGroup) {
    //Validation
    
    return groupServices.addToGroup(data)
}

export async function removeFromGroup(data: addToGroup) {
    return groupServices.removeFromGroup(data)
}