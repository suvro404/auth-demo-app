export const setLoggedInStatus = (state, status) => {
  state.isLoggedIn = status;
  console.log(state.isLoggedIn);
}
