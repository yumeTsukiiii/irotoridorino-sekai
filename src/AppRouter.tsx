import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Entry from "./pages/entry/Entry";
import Main from "./pages/main/Main";
import WorldEndLove from "./pages/world_end_love/WorldEndLove";
import Article from "./pages/article";

const AppRouter: React.FC = () => {
    return (
        <HashRouter>
            <Route exact path={"/"}>
                {/*<Entry/>*/}
                <Article/>
            </Route>
            <Route path={'/main'}>
                <Main/>
            </Route>
            <Route path={'/world_end_love'}>
                <WorldEndLove/>
            </Route>
        </HashRouter>
    )
};

export default AppRouter;
