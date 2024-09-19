const currentUser = (state: any) => state.usersStore.currentUser
const userAccess = (state: any) => state.usersStore.currentUser?.access
export const userSelectors = { currentUser, userAccess }