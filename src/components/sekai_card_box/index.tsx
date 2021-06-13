import React, {CSSProperties, useCallback, useMemo, useRef} from "react";

type SekaiCardBoxProps = {
    width?: string|number,
    height?: string|number,
    onHover?: () => any,
    onBlur?: () => any,
    onClick?: () => any,
    style?: CSSProperties,
    containerStyle?: CSSProperties
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
    contentBackgroundColor: 'rgba(97, 144, 158, 0.4)' as string,
    contentBackgroundHoverColor: 'rgba(255, 255, 255, 0.5)' as string,
    borderStartColor: 'rgb(24, 21, 65)' as string,
    borderEndColor: 'rgb(35, 218, 255)' as string,
    tbLineHeight: 2 as string|number,
    lrLineWidth: 6 as string|number,
    canHover: true as boolean,
    clearHoverStyle: false as boolean
}

const SekaiCardBox: React.FC<SekaiCardBoxProps> = (props) => {

    // 该组件的top和bottom的border
    const HorizontalLine = useMemo<React.FC<{
        color?: string,
        top?: string|number,
        bottom? : string|number,
    }>>(() => {
        return (lProps) => (
            <div style={{
                height: props.tbLineHeight,
                backgroundColor: lProps.color,
                position: "absolute",
                top: lProps.top,
                left: 0,
                right: 0,
                bottom: lProps.bottom
            }}/>
        );
    }, [props.tbLineHeight]);

    // 该组件的left和right的border
    const VerticalLine = useMemo<React.FC<{
        left?: string|number,
        right? : string|number
    }>>(() => {
        return (lProps) => (
            <div style={{
                width: props.lrLineWidth,
                backgroundImage: `linear-gradient(${props.borderStartColor}, ${props.borderEndColor})`,
                position: "absolute",
                top: -2,
                bottom: -2,
                left: lProps.left,
                right: lProps.right,
            }}/>
        );
    }, [props.lrLineWidth, props.borderStartColor, props.borderEndColor]);

    // 内部children容器的top和bottom属性，控制高度
    const containerTb = useMemo(() => {
        return `calc(${typeof props.tbLineHeight === 'number' ? `${props.tbLineHeight}px` : props.tbLineHeight} + 2px)`
    }, [props.tbLineHeight]);

    // 内部children容器的left和right属性，控制宽度
    const containerLr = useMemo(() => {
        return `calc(${typeof props.lrLineWidth === 'number' ? `${props.lrLineWidth}px` : props.lrLineWidth} + 2px)`;
    }, [props.lrLineWidth]);

    const rootRef = useRef<HTMLDivElement>(null);

    /**
     * hover时修改背景色
     */
    const handleRootHover = useCallback(async () => {
        if (!props.contentBackgroundHoverColor || !rootRef.current) return;
        if (!props.clearHoverStyle) {
            rootRef.current.style.backgroundColor = props.contentBackgroundHoverColor;
        }
        props.onHover?.call(null);
    }, [props.contentBackgroundHoverColor, props.onHover, props.clearHoverStyle]);

    /**
     * blur时修改背景色
     */
    const handleRootBlur = useCallback(() => {
        if (!props.contentBackgroundColor || !rootRef.current) return;
        if (!props.clearHoverStyle) {
            rootRef.current.style.backgroundColor = props.contentBackgroundColor;
        }
        props.onBlur?.call(null);
    }, [props.contentBackgroundColor, props.onBlur, props.clearHoverStyle]);

    return (
        <div ref={rootRef} style={{
            width: props.width,
            height: props.height,
            backgroundColor: props.contentBackgroundColor,
            position: "relative",
            ...props.style
        }} onClick={props.onClick}
            onMouseOver={props.canHover ? handleRootHover : undefined}
            onMouseOut={props.canHover ? handleRootBlur: undefined}>
            <HorizontalLine top={0} color={props.borderStartColor} />
            <HorizontalLine bottom={0} color={props.borderEndColor}/>
            <VerticalLine left={0}/>
            <VerticalLine right={0}/>
            <div style={{
                position: "absolute",
                top: containerTb,
                bottom: containerTb,
                left: containerLr,
                right: containerLr,
                border: '1px solid white',
                ...props.containerStyle
            }}>
                {props.children}
            </div>
        </div>
    );
};

SekaiCardBox.defaultProps = defaultProps;

export default SekaiCardBox;
