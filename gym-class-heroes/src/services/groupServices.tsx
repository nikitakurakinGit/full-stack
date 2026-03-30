import * as groupServices from '../apis/groupsRepo';
import type { GroupsInterface } from '../components/interface/groupsInterface';

export async function fetchGroups(): Promise<GroupsInterface[]> {
    const groups = await groupServices.fetchGroups();
    return groups;
}