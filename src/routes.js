import Admin from "./pages/Admin"
import Account from "./pages/Account"
import CreateTest from "./pages/CreateTest"
import Login from "./pages/Login"
import Test from "./pages/Test"
import MainPage from "./pages/MainPage"
import Results from "./pages/Results"
import {
    ACCOUNT_ROUTE,
    ADMIN_ROUTE,
    CREATE_TEST_ROUTE,
    LOGIN_ROUTE,
    TEST_ROUTE,
    MAIN_PAGE_ROUTE,
    REGISTER_ROUTE,
    HOME_ROUTE,
    ABOUT_TESTS_ROUTE, RESULTS_ROUTE
} from "./utils/consts"
import Home from "./pages/Home";
import AboutTests from "./pages/AboutTests";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    },
    {
        path: CREATE_TEST_ROUTE,
        Component: CreateTest
    },
    {
        path: RESULTS_ROUTE + '/:id',
        Component: Results
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTER_ROUTE,
        Component: Login
    },
    {
        path: TEST_ROUTE + '/:id',
        Component: Test
    },
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage
    },
    {
        path: ABOUT_TESTS_ROUTE,
        Component: AboutTests
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
]