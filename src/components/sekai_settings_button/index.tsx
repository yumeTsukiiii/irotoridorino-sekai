import React, {CSSProperties, ReactNode, useRef} from "react";

type SekaiSettingsButtonProps = {
    subText?: string,
    children: ReactNode,
    style?: CSSProperties,
    onClick?: () => any
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    disabled: false as boolean
};

const SekaiSettingsButton: React.FC<SekaiSettingsButtonProps> = (props) => {

    const mainTextRef = useRef<HTMLParagraphElement>(null)
    const subTextRef = useRef<HTMLSpanElement>(null);
    const bottomLineRef = useRef<HTMLDivElement>(null);

    const handleMainTextHover = () => {
        if (!mainTextRef.current) return;
        if (!subTextRef.current) return;
        if (!bottomLineRef.current) return;
        mainTextRef.current.style.opacity = '0.9';
        subTextRef.current.style.display = 'inline';
        bottomLineRef.current.style.opacity = '1.0';
    };

    const handleMainTextBlur = () => {
        if (!mainTextRef.current) return;
        if (!subTextRef.current) return;
        if (!bottomLineRef.current) return;
        mainTextRef.current.style.opacity = '0.6';
        subTextRef.current.style.display = 'none';
        bottomLineRef.current.style.opacity = '0.0';
    }

    return (
        <div style={{
            ...props.style,
            textAlign: "right"
        }}>
            <div style={{
                marginBottom: 1
            }}>
                {props.subText && <span style={{
                    color: "white",
                    textShadow: '0px 0px 4px #57f1ff, 0px 0px 4px #57f1ff',
                    fontSize: '1em',
                    position: "relative",
                    right: 8,
                    bottom: 2,
                    display: "none"
                }} ref={subTextRef}>
                    {props.subText}
                </span>}
                <p
                    onMouseOver={handleMainTextHover}
                    onMouseOut={handleMainTextBlur}
                    onClick={props.onClick}
                    ref={mainTextRef}
                    style={{
                        display: "inline",
                        opacity: 0.6,
                        color: 'white',
                        fontSize: '2.2em',
                        fontWeight: 350,
                        textShadow: '0px 0px 4px #57f1ff, 0px 0px 4px #57f1ff'
                    }}>
                    {props.children}
                </p>
            </div>

            <div style={{
                width: '42vw',
                height: '3px',
                opacity: 0,
                transform: 'translateX(2.3%)',
                background: "linear-gradient(to right, rgba(57,241,255,0), rgba(57,241,255,0.1), rgba(255,255,255,0.6), rgba(255,255,255,0.9))"
            }} ref={bottomLineRef}/>
        </div>
    )
};

SekaiSettingsButton.defaultProps = defaultProps;

export default SekaiSettingsButton;