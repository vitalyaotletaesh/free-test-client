import Admin from "./pages/Admin"
import Account from "./pages/Account"
import CreateTest from "./pages/CreateTest"
import Login from "./pages/Login"
import Test from "./pages/Test"
import MainPage from "./pages/MainPage"
import {
    ACCOUNT_ROUTE,
    ADMIN_ROUTE,
    CREATE_TEST_ROUTE,
    LOGIN_ROUTE,
    TEST_ROUTE,
    MAIN_PAGE_ROUTE,
    REGISTER_ROUTE
} from "./utils/consts"

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
]