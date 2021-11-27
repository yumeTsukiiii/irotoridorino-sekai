import EventEmitter from "events";
import React, { useCallback, useEffect } from "react";
import { useMDSnackTip } from "../md_snack_tip";

const eventBus = new EventEmitter();

export const MD_SNACK_TIP_INFO_MESSAGE_EVENT = 'md_snack_tip_info_message_event'
export const MD_SNACK_TIP_ERROR_MESSAGE_EVENT = 'md_snack_tip_error_message_event'
export const MD_SNACK_TIP_SUCCESS_MESSAGE_EVENT = 'md_snack_tip_success_message_event'

export const showSuccess = (msg: string) => {
    eventBus.emit(MD_SNACK_TIP_SUCCESS_MESSAGE_EVENT, msg)
}

export const showError = (msg: string) => {
    eventBus.emit(MD_SNACK_TIP_ERROR_MESSAGE_EVENT, msg)
}

export const showInfo = (msg: string) => {
    eventBus.emit(MD_SNACK_TIP_INFO_MESSAGE_EVENT, msg)
}

export const MDSnackTipEventReceiver: React.FC = (props) => {
    const mdSnackTip = useMDSnackTip();

    const showInfoTip = useCallback((msg: string) => {
        mdSnackTip.showInfo(msg);
    }, [mdSnackTip]);

    const showSuccessTip = useCallback((msg: string) => {
        mdSnackTip.showSuccess(msg);
    }, [mdSnackTip]);

    const showErrorTip = useCallback((msg: string) => {
        mdSnackTip.showError(msg);
    }, [mdSnackTip]);

    useEffect(() => {
        eventBus.addListener(MD_SNACK_TIP_INFO_MESSAGE_EVENT, showInfoTip);
        eventBus.addListener(MD_SNACK_TIP_SUCCESS_MESSAGE_EVENT, showSuccessTip);
        eventBus.addListener(MD_SNACK_TIP_ERROR_MESSAGE_EVENT, showErrorTip);
        return () => {
            eventBus.removeListener(MD_SNACK_TIP_INFO_MESSAGE_EVENT, showInfoTip);
            eventBus.removeListener(MD_SNACK_TIP_SUCCESS_MESSAGE_EVENT, showSuccessTip);
            eventBus.removeListener(MD_SNACK_TIP_ERROR_MESSAGE_EVENT, showErrorTip);
        }
    }, [showInfoTip, showSuccessTip, showErrorTip]);

    return (
        <>
            {props.children}
        </>
    );
}