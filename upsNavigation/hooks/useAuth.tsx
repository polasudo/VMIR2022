import React, {useEffect} from "react";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import app from "../config/firebaseConfig";

const auth = getAuth(app);

export function useAuth() {
    const [user, setUser] = React.useState<User>();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);
            } else {
                // User is signed out
                setUser(undefined);
            }
        });
    }, []);

    return {
        user,
    };
}