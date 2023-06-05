import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {useSelector} from "react-redux";
import {checkIsAuth} from "../redux/features/auth/authSlice";

const AppRouter = () => {
    const isAuth = useSelector(checkIsAuth)
    return (
        <div>
            <Routes>
                {isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} Component={Component} exact/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} Component={Component} exact/>
                )}
            </Routes>
        </div>
    );
};

export default AppRouter;