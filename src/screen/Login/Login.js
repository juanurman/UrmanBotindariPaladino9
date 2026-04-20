import React from "react";
import FormLogin from "../../components/FormLogin/FormLogin";
import Header from "../../components/Header/Header";

function Login() {
    return(
        <>
            <Header/>
            <div>
                <h2 className="alert alert-primary">Login</h2>
                <FormLogin/>
            </div>
        </>
    )
}

export default Login
