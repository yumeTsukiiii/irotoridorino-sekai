import React, {MouseEventHandler} from "react";
import TipMenu from "../tip_menu/TipMenu";

type WindowTipMenuProps = {
    tipText: string,
    show: boolean
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    showYes: true as boolean,
    showNo: true as boolean,
    yesText: '是' as string,
    noText: '否' as string,
    bottomText: '' as string,
    onMenuClick: undefined as MouseEventHandler<HTMLDivElement> | undefined,
    onYesClick: undefined as MouseEventHandler<HTMLButtonElement> | undefined,
    onNoClick: undefined as MouseEventHandler<HTMLButtonElement> | undefined,
    width: '612px' as string,
    zIndex: 1999 as number
};

const WindowTipMenu: React.FC<WindowTipMenuProps> = (props) => {
    return (
        <TipMenu {...props} style={{
            position: "fixed",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -70%)',
            zIndex: props.zIndex,
        }}/>
    )
};

WindowTipMenu.defaultProps = defaultProps;

export default WindowTipMenu;