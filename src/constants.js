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
export const UPDATE_USER_STATUS_URL = GO_BASE_URL + "admin/updateuserstatus";
export const SAVE_POLL_URL = PHP_BASE_URL + "savepoll";
export const CONFIRM_USER_URL = GO_BASE_URL + "user/confirmuser";
export const UPDATE_PROFILE_URL = GO_BASE_URL + "user/updateprofile";
export const ALL_POLLS_URL = PHP_BASE_URL + "allpolls";
export const FORGOT_PASSWORD_URL = GO_BASE_URL + "user/forgotpassword";
export const VALIDATE_OTP_URL = GO_BASE_URL + "user/validateotp";
export const RESET_PASSWORD_URL = GO_BASE_URL + "user/changepassword";
export const POLL_ANSWERS_URL = GO_BASE_URL + "admin/getanswers/";
export const DELETE_POLL_URL = PHP_BASE_URL + "deletepoll/";
export const POLL_OPTION_STATS_URL = GO_BASE_URL + "user/polloptionstats/";

export const ADMIN_ROUTES = [
    {
        name: "dashboard",
        route: "/admin/dashboard",
        activePaths: ["/admin/dashboard"],
    },

    {
        name: "Polls",
        route: "/admin/allpolls",
        activePaths: [
            "/admin/allpolls",
            "/admin/allpolls/:id",
            "/admin/create",
            "/admin/edit/:id",
        ],
    },
    {
        name: "Users",
        route: "/admin/allusers",
        activePaths: ["/admin/allusers"],
    },
    {
        name: "profile",
        route: "/admin/profile",
        activePaths: ["/admin/profile"],
    },
];
export const USER_ROUTES = [
    {
        name: "dashboard",
        route: "/user/dashboard",
        activePaths: ["/user/dashboard", "/user/dashboard/:id"],
    },
    {
        name: "Answered polls",
        route: "/user/answeredpolls",
        activePaths: ["/user/answeredpolls", "/user/answeredpolls/:id"],
    },
    {
        name: "profile",
        route: "/user/profile",
        activePaths: ["/user/profile"],
    },
];
export const USER_ROLE = "user";
export const ADMIN_ROLE = "admin";

export const PIE_GRAPH_COLORS = [
    "#fd7f6f",
    "#7eb0d5",
    "#009fff",
    "#df979e",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#00bfff",
    "#dedad2",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7",
    "#ede15b",
    "#bdcf32",
    "#0080ff",
    "#00ffff",
    "#e4bcad",
];
