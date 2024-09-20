import { create } from "zustand";
import { useChatStore } from "./chatStore";
import { useUserStore } from "./userStore";

export const useGroupChatStore = create((set) => ({
  groupId: null,
  groupName: '', // Add groupName property
  groupMembers: [],
  isUserInGroup: false,
  
  changeGroupChat: (groupId, groupName, members) => {
    // Reset chatId in chatStore if groupId is being set
    if (groupId) {
      useChatStore.getState().resetChat();
    }

    const currentUser = useUserStore.getState().currentUser;
    const isUserInGroup = members.includes(currentUser.id);

    set({
      groupId,
      groupName, // Set groupName
      groupMembers: members,
      isUserInGroup,
    });
  },

  resetGroupChat: () => {
    set({
      groupId: null,
      groupName: '', // Reset groupName
      groupMembers: [],
      isUserInGroup: false,
    });
  },
}));
