const GO_BASE_URL = "http://localhost:8080/api/v1/";
const PHP_BASE_URL = "http://localhost/api/v1/";

const createPollApi = PHP_BASE_URL + "createpoll";
const signUp = GO_BASE_URL + "signup";
const login = GO_BASE_URL + "login";
const addUser = PHP_BASE_URL + "/adduser";
const ACTIVE_POLLS_URL = PHP_BASE_URL + "/activepolls";
const ANSWERED_POLLS_URL = PHP_BASE_URL + "/answeredpolls";
export {
    createPollApi,
    GO_BASE_URL,
    PHP_BASE_URL,
    signUp,
    login,
    addUser,
    ACTIVE_POLLS_URL,
    ANSWERED_POLLS_URL,
};

export const AUTH_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY1NTM1OTUsImlkIjoyLCJyb2xlIjoidXNlciIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9.bvSK1sC3yLJDftzaV66LGJ64hM0_ZF9YjQS2a4uMQ4A`;
