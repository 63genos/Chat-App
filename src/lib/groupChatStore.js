import { create } from "zustand";
import { useChatStore } from "./chatStore";
import { useUserStore } from "./userStore";

export const useGroupChatStore = create((set) => ({
  groupId: null,
  groupName: '',
  groupMembers: [],
  isUserInGroup: false,
  
  changeGroupChat: (groupId, groupName, members) => {
   
    if (groupId) {
      useChatStore.getState().resetChat();
    }

    const currentUser = useUserStore.getState().currentUser;
    const isUserInGroup = members.includes(currentUser.id);

    set({
      groupId,
      groupName, 
      groupMembers: members,
      isUserInGroup,
    });
  },

  resetGroupChat: () => {
    set({
      groupId: null,
      groupName: '', 
      groupMembers: [],
      isUserInGroup: false,
    });
  },
}));
