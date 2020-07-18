import React from 'react';
import './App.css';
import AppRouter from "./AppRouter";
import AppContextWrapper from "./context/AppContextWrapper";

function App() {
    return (
        <AppContextWrapper>
            <AppRouter/>
        </AppContextWrapper>
    );
}

export default App;
