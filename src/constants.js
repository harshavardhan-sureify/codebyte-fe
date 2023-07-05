export const GO_BASE_URL = "http://localhost:8080/api/v1/";
export const PHP_BASE_URL = "http://localhost/api/v1/";

export const CREATE_POLL_URL = PHP_BASE_URL + "createpoll";
export const SIGNUP_URL = GO_BASE_URL + "signup";
export const ADD_USER_URL = GO_BASE_URL + "admin/adduser";
export const ACTIVE_POLLS_URL = PHP_BASE_URL + "activepolls";
export const ANSWERED_POLLS_URL = PHP_BASE_URL + "answeredpolls";
export const LOGIN_URL = GO_BASE_URL + "login";
export const ADMIN_DASHBOARD_URL = GO_BASE_URL + "admin/dashboard";
export const ALL_USERS_URL = PHP_BASE_URL + "viewusers";
export const USER_INFO_URL = GO_BASE_URL + "user/userinfo";
export const DELETE_USER_URL = GO_BASE_URL + "admin/delete";
export const SAVE_POLL_URL = PHP_BASE_URL + "savepoll";
export const CONFIRM_USER_URL = GO_BASE_URL + "user/confirmuser";
export const UPDATE_PROFILE_URL = GO_BASE_URL + "user/updateprofile";
export const ALL_POLLS_URL = PHP_BASE_URL + "allpolls";
export const FORGOT_PASSWORD_URL = GO_BASE_URL + "user/forgotpassword";
export const VALIDATE_OTP_URL = GO_BASE_URL + "user/validateotp";
export const RESET_PASSWORD_URL = GO_BASE_URL + "user/changepassword";
export const POLL_ANSWERS_URL = GO_BASE_URL + "admin/getanswers/";
export const ADMIN_ROUTES = [
  {
    name: "dashboard",
    route: "/admin/dashboard",
  },

  {
    name: "Polls",
    route: "/admin/allpolls",
  },
  {
    name: "Users",
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

