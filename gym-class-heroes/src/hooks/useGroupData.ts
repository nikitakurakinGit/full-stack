import { useEffect, useState } from "react";
import type { GroupsInterface } from "../components/interface/groupsInterface";
import * as GroupService from "../services/groupService";

export function useGroupData(dependencies: unknown[] = []) {
  const [groups, setGroups] = useState<GroupsInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all groups from the service
   */
  const fetchGroups = async () => {
    try {
      const result = await GroupService.getAllGroups();
      setGroups([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  /**
   * Add resource (athlete, coach, workout) to group
   * After service updates data, re-fetch groups
   * e.g. addToGroup("athlete", athlete.id, groupId)
   */
  const addToGroup = async (
    resourceType: string,
    resourceId: number,
    groupId: string
  ) => {
    try {
      await GroupService.addToGroup(resourceType, resourceId, groupId);
      await fetchGroups();
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  /**
   * Remove resource from group.
   * After service updates data, re-fetch groups.
   */
  const removeFromGroup = async (
    resourceType: string,
    resourceId: number,
    groupId: string
  ) => {
    try {
      await GroupService.removeFromGroup(resourceType, resourceId, groupId);
      await fetchGroups();
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
