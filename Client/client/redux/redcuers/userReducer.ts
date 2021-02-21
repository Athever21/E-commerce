export default (state:any = {},action: any) => {
  switch(action.type) {
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return {};
    default:
      return state;
  }
}