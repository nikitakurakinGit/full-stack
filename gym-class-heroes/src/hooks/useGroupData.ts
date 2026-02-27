import { useEffect, useState } from "react";
import type { GroupsInterface } from "../components/interface/groupsInterface";
import * as GroupService from "../services/groupServices";
import type { GroupArrayKey } from "../components/interface/groupArrayKey";

export function useGroupData(dependencies: unknown[] = []) {
  const [groups, setGroups] = useState<GroupsInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all groups from the service
   */
  const fetchGroups = async () => {
    try {
      const result = await GroupService.fetchGroups();
      setGroups([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  /**
   * 
   */
  const addToGroup = async (
      groupId: string,
      key: GroupArrayKey,
      subjectId: number
  ) => {
    try {
      const updatedGroups = await GroupService.addToGroup({groupId, key, subjectId});
      setGroups(updatedGroups);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  /**
   * 
   */
  const removeFromGroup = async (
      groupId: string,
      key: GroupArrayKey,
      subjectId: number
  ) => {
    try {
      const updatedGroups = await GroupService.removeFromGroup({groupId, key, subjectId});
      setGroups(updatedGroups);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  /**
   * Fetch groups on mount and whenever dependencies change.
   */
  useEffect(() => {
    fetchGroups();
  }, [...dependencies]);

  return {
    groups,
    error,
    addToGroup,
    removeFromGroup,
  };
}
