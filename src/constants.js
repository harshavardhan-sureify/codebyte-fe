const GO_BASE_URL = "http://localhost:8080/api/v1/";
const PHP_BASE_URL = "http://localhost/api/v1/";

const createPollApi = PHP_BASE_URL + "createpoll";
const signUp = GO_BASE_URL + "signup";
const loginApi = GO_BASE_URL + "login";
const adminDashboardApi = GO_BASE_URL+"admin/dashboard";
const allUsers = PHP_BASE_URL + "viewusers";
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
};
