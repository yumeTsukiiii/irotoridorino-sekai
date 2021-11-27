import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Entry from "./pages/entry/Entry";
import Main from "./pages/main/Main";
import WorldEndLove from "./pages/world_end_love/WorldEndLove";
import Article from "./pages/article";
import ArticleContent from "./pages/article_content";

const AppRouter: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path={"/"} element={<Entry/>}>
                    {/*<ArticleContent/>*/}
                </Route>
                <Route path={"/article/:articleId"} element={<ArticleContent/>}/>
                <Route path={'/main'} element={<Main/>}/>
                <Route path={'/world_end_love'} element={<WorldEndLove/>}/>
            </Routes>
        </HashRouter>
    )
};

export default AppRouter;
