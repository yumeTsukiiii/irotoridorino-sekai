import React, {CSSProperties, useCallback, useState} from "react";
import SekaiCardBox from "../sekai_card_box";

type SekaiCardButtonProps = {
    style?: CSSProperties,
    textStyle?: CSSProperties,
    onHover?: () => any,
    onBlur?: () => any,
    onClick?: () => any,
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
    width: '100%' as CSSProperties['width'],
    height: 32 as CSSProperties['height']
};

const SekaiCardButton: React.FC<SekaiCardButtonProps> = (props) => {

    const [currentOpacity, setCurrentOpacity] = useState(0.6);

    /**
     * hover时修改透明度
     */
    const handleRootHover = useCallback(async () => {
        setCurrentOpacity(1.0);
        props.onHover?.call(null);
    }, []);

    /**
     * blur时修改透明度
     */
    const handleRootBlur = useCallback(() => {
        setCurrentOpacity(0.6);
        props.onBlur?.call(null);
    }, []);

    return (
        <SekaiCardBox
            width={props.width}
            height={props.height}
            containerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            style={{
                opacity: currentOpacity,
                ...props.style
            }}
            onHover={handleRootHover}
            onBlur={handleRootBlur}
            onClick={props.onClick}
            clearHoverStyle={true}>
            <span style={{
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                ...props.textStyle
            }}>{props.children}</span>
        </SekaiCardBox>
    )
};

SekaiCardButton.defaultProps = defaultProps;

export default SekaiCardButton;
