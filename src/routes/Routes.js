import React from 'react'
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";


export default function Routes() {
    return (
        <Switch>
            <Route path="/home" exact>
                <Home/>
            </Route>
            <Route path="/setting" exact>
                <h1>Configuracion de cuenta</h1>
            </Route>
        </Switch>
    );
}