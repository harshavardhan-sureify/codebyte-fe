const GO_BASE_URL = "http://localhost:8080/api/v1/";
const PHP_BASE_URL = "http://localhost/api/v1/";

const createPollApi = PHP_BASE_URL + "createpoll";
const signUp = GO_BASE_URL + "signup";
const addUser = PHP_BASE_URL + "adduser";
const ACTIVE_POLLS_URL = PHP_BASE_URL + "activepolls";
const ANSWERED_POLLS_URL = PHP_BASE_URL + "answeredpolls";
const loginApi = GO_BASE_URL + "login";
const adminDashboardApi = GO_BASE_URL + "admin/dashboard";
const allUsers = PHP_BASE_URL + "viewusers";
const userInfo = GO_BASE_URL + "user/userinfo";
export const SAVE_POLL_URL = PHP_BASE_URL + "savepoll";
const confirmuser = GO_BASE_URL + "user/confirmuser";
const updateProfile = GO_BASE_URL + "user/updateprofile";
export const ADMIN_ROUTES = [
  {
    name: "dashboard",
    route: "/admin/dashboard",
  },
  {
    name: "Active polls",
    route: "/admin/activepolls",
  },
  {
    name: "All polls",
    route: "/admin/allpolls",
  },
  {
    name: "All users",
    route: "/admin/allusers",
  },
  {
    name: "profile",
    route: "/admin/profile",
  },
];
export const USER_ROUTES = [
  {
    name: "dashboard",
    route: "/user/dashboard",
  },
  {
    name: "Answered polls",
    route: "/user/answeredpolls",
  },
  {
    name: "profile",
    route: "/user/profile",
  },
];
export const USER_ROLE = "user";
export const ADMIN_ROLE = "admin";

export {
  createPollApi,
  GO_BASE_URL,
  PHP_BASE_URL,
  signUp,
  loginApi,
  adminDashboardApi,
  allUsers,
  addUser,
  ACTIVE_POLLS_URL,
  ANSWERED_POLLS_URL,
  confirmuser,
  userInfo,
  updateProfile,
};
