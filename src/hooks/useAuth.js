import React from "react";
import { AuthContext } from "components/providers/AuthProvider";

function useAuth(){
    const value = React.useContext(AuthContext);

    if(!value){
        throw new Error("useAuth must be used inside an AuthProvider!");
    }

    return value;
}

export default useAuth;