import {BrowserRouter} from "react-router-dom";
import React, {useEffect} from "react";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {getMe} from "./redux/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const role = useSelector((state) => state.auth.role)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <BrowserRouter>
            <NavBar role={role}/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
