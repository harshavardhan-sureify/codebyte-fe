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

// export const AUTH_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY2NzkzMzQsImlkIjoyLCJyb2xlIjoidXNlciIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSJ9.blLH3GJPriX3Mlm0kUNTBa9f0ppuktQDQ70OjgE7UPA`;
export const AUTH_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY2ODU0MzEsImlkIjoyMSwicm9sZSI6InVzZXIiLCJlbWFpbCI6InNvZmlhQGV4YW1wbGUuY29tIn0.l3bsOxO7svQZgkWD7PTwXMzAu2xQGGgEWayOBuwS3FA`;