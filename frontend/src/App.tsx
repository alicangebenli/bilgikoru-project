import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Login} from "./pages/Auth/Login"
import {MemberIndex} from "./pages/Member/Index";
import {MemberCreate} from "./pages/Member/Create";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Login/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/members">
                            <MemberIndex/>
                        </Route>
                        <Route exact path="/members/create">
                            <MemberCreate/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;