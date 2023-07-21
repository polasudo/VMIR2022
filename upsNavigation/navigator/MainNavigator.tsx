import React from "react";
import {useAuth} from "../hooks/useAuth";
import AuthStack from "./AuthNavigator";
import RootNavigator from "./RootNavigator";

const MainNavigator = () => {
    const {user} = useAuth();
    return (
        <>
            {user ? <RootNavigator/> : <AuthStack/>}
        </>
    );
};

export default MainNavigator;