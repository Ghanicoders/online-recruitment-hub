export const saveUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const logout = () => localStorage.removeItem("user");
export const isLoggedIn = () => !!localStorage.getItem("user");
