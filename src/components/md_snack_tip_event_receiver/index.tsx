import EventEmitter from "events";
import React, { useEffect } from "react";;
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

    const showInfoTip = (msg: string) => {
        mdSnackTip.showInfo(msg);
    }

    const showSuccessTip = (msg: string) => {
        mdSnackTip.showSuccess(msg);
    }

    const showErrorTip = (msg: string) => {
        mdSnackTip.showError(msg);
    }

    useEffect(() => {
        eventBus.addListener(MD_SNACK_TIP_INFO_MESSAGE_EVENT, showInfoTip);
        eventBus.addListener(MD_SNACK_TIP_SUCCESS_MESSAGE_EVENT, showSuccessTip);
        eventBus.addListener(MD_SNACK_TIP_ERROR_MESSAGE_EVENT, showErrorTip);
        return () => {
            eventBus.removeListener(MD_SNACK_TIP_INFO_MESSAGE_EVENT, showInfoTip);
            eventBus.removeListener(MD_SNACK_TIP_SUCCESS_MESSAGE_EVENT, showSuccessTip);
            eventBus.removeListener(MD_SNACK_TIP_ERROR_MESSAGE_EVENT, showErrorTip);
        }
    }, []);

    return (
        <>
            {props.children}
        </>
    );
}