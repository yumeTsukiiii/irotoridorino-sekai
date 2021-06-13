import React, {CSSProperties, useCallback, useEffect, useState} from "react";
import SekaiCardBox from "../sekai_card_box";

type SekaiCardButtonProps = {
    style?: CSSProperties,
    textStyle?: CSSProperties,
    onHover?: () => any,
    onBlur?: () => any,
    onClick?: () => any,
    hover?: boolean
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
    width: '100%' as CSSProperties['width'],
    height: 32 as CSSProperties['height'],
    tbLineHeight: 2 as string|number,
    lrLineWidth: 6 as string|number,
};

const SekaiCardButton: React.FC<SekaiCardButtonProps> = (props) => {

    const [currentOpacity, setCurrentOpacity] = useState(0.6);

    /**
     * hover时修改透明度
     */
    const handleRootHover = useCallback(async () => {
        if (props.hover === undefined) {
            setCurrentOpacity(1.0);
        }
        props.onHover?.call(null);
    }, [props.hover, props.onHover]);

    /**
     * blur时修改透明度
     */
    const handleRootBlur = useCallback(() => {
        if (props.hover === undefined) {
            setCurrentOpacity(0.6);
        }
        props.onBlur?.call(null);
    }, [props.hover, props.onBlur]);

    useEffect(() => {
        if (props.hover === undefined) {
            setCurrentOpacity(0.6);
        }
    }, [props.hover]);

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
                opacity: props.hover === undefined ? currentOpacity : props.hover ? 1.0 : 0.6 ,
                ...props.style
            }}
            onHover={handleRootHover}
            onBlur={handleRootBlur}
            onClick={props.onClick}
            clearHoverStyle={true}
            tbLineHeight={props.tbLineHeight}
            lrLineWidth={props.lrLineWidth}>
            <span style={{
                color: "white",
                fontSize: '1vw',
                fontWeight: 600,
                ...props.textStyle
            }}>{props.children}</span>
        </SekaiCardBox>
    )
};

SekaiCardButton.defaultProps = defaultProps;

export default SekaiCardButton;
