import type { GroupsInterface } from "../components/interface/groupsInterface";
const API_URL = import.meta.env.VITE_API_URL; 

export async function fetchGroups(): Promise<GroupsInterface[]>{
    console.log("API_URL:", API_URL);
    const res = await fetch(`${API_URL}/groups`)

    const data: GroupsInterface[] = await res.json()
    console.log(data)
    return data;
}