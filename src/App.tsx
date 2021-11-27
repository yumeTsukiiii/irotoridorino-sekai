import React from 'react';
import './App.css';
import AppRouter from "./AppRouter";
import { MDSnackTipProvider } from './components/md_snack_tip';
import { MDSnackTipEventReceiver } from './components/md_snack_tip_event_receiver';
import AppContextWrapper from "./context/AppContextWrapper";

function App() {
    return (
        <AppContextWrapper>
            <MDSnackTipProvider>
                <MDSnackTipEventReceiver>
                    <AppRouter/>
                </MDSnackTipEventReceiver>
            </MDSnackTipProvider>
        </AppContextWrapper>
    );
}

export default App;
