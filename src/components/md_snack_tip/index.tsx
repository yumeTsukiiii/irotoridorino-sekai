import React, { useContext, useState } from "react";
import { Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@material-ui/core';

type MDSnackTipProps = {
    isOpen: boolean,
    text: string,
    severity?: AlertColor,
    handleClose?: (event: React.SyntheticEvent<any>, reason?: SnackbarCloseReason) => void
} & Partial<typeof defaultProps>

const defaultProps = {
    autoHideDuration: 1500 as number
}

export interface MDSnackTipContext {
    showSuccess: (text: string) => void
    showError: (text: string) => void
    showInfo: (text: string) => void
}

export const mdSnackTipContext = React.createContext<MDSnackTipContext>({
    showSuccess: () => {},
    showError: () => {},
    showInfo: () => {}
});

export const MDSnackTipProvider: React.FC = (props) => {

    const [tipState, setTipState] = useState<{
        isOpen: boolean,
        text?: string,
        severity?: AlertColor
    }>({
        isOpen: false,
        text: undefined as string|undefined,
        severity: undefined as AlertColor|undefined
    })

    const handleClose = () => {
        setTipState({
            isOpen: false
        })
    };

    const showSuccess = (text: string) => {
        console.log('确实调用了');
        setTipState({
            isOpen: true,
            text: text,
            severity: 'success',
        });
    };

    const showError = (text: string) => {
        setTipState({
            isOpen: true,
            text: text,
            severity: 'error',
        });
    };

    const showInfo = (text: string) => {
        setTipState({
            isOpen: true,
            text: text,
            severity: 'info',
        });
    };

    const contextValue = {
        showSuccess, showError, showInfo
    }

    return (
        <mdSnackTipContext.Provider value={contextValue}>
            {props.children}
            <MDSnackTip 
                isOpen={tipState.isOpen} 
                handleClose={handleClose}
                severity={tipState.severity}
                text={tipState.text ?? ''}/>
        </mdSnackTipContext.Provider>
    )
}

export const useMDSnackTip: () => MDSnackTipContext = () => {
    return useContext<MDSnackTipContext>(mdSnackTipContext);
}

const MDSnackTip: React.FC<MDSnackTipProps> = (props) => {
    return (
        <Snackbar 
            open={props.isOpen} 
            autoHideDuration={props.autoHideDuration}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.text}
            </Alert>
        </Snackbar>
    );
};

MDSnackTip.defaultProps = defaultProps;

export default MDSnackTip;