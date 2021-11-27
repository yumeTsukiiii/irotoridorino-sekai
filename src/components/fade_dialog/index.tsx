import React, {CSSProperties} from "react";

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type FadeDialogProps = {
    open: boolean,
    zIndex?: number,
    style: CSSProperties
} & Partial<Readonly<typeof defaultProps>> & DivProps

const defaultProps = {
    fullscreen: true as boolean
};

const FadeDialog: React.FC<FadeDialogProps> = (props) => {
    return (
        <div {...props} style={{
            transition: 'opacity 0.6s, visibility 0.6s',
            opacity: props.open ? 1 : 0,
            visibility: props.open ? "visible" : "hidden",
            zIndex: props.zIndex,
            ...props.style,
            ...(props.fullscreen ? {
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            } : {})
        }} onClick={props.onClick}>
            {props.children}
        </div>
    );
};

FadeDialog.defaultProps = defaultProps

export default FadeDialog;