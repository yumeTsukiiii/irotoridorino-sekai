import React, {CSSProperties, MouseEventHandler, useEffect, useState} from 'react';
import './animation_button.css';

type AnimationButtonProps = {
    mainText: string,
    subText: string
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    fontWeight: 400 as number,
    fontSize: '2.5em' as string,
    subFontWeight: 400 as number,
    subFontSize: '1em' as string,
    subTextLetterSpacing: '16px' as string,
    onClick: undefined as undefined | MouseEventHandler<HTMLDivElement>,
    onHover: undefined as undefined | Function
};

const AnimationButton: React.FC<AnimationButtonProps> = (props: AnimationButtonProps) => {

    const [hover, setHover] = useState<boolean | null>(null);

    const onBtnHover = () => {
        setHover(true);
    };

    const onBtnNotHover = () => {
        setHover(false);
    };

    const styles = {
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            cursor: 'pointer'
        } as CSSProperties,
        mainText: {
            fontWeight: props.fontWeight,
            fontSize: props.fontSize,
            letterSpacing: '2px'
        } as CSSProperties,
        subText: {
            fontWeight: props.subFontWeight,
            fontSize: props.subFontSize,
            letterSpacing: props.subTextLetterSpacing
        } as CSSProperties
    };

    useEffect(() => {
        if (hover) {
            props.onHover && props.onHover();
        }
    }, [hover, props]);

    return (
        <div
            style={styles.root}
            onMouseEnter={onBtnHover}
            onMouseLeave={onBtnNotHover}
            onClick={props.onClick}>
            <div className={`main-text ${hover == null ? '' : hover ? 'main-text-hover' : 'main-text-not-hover'}`} style={styles.mainText}>
                {props.mainText}
            </div>
            <div className={`sub-text ${hover == null ? '' : hover ? 'sub-text-hover' : 'sub-text-not-hover'}`} style={styles.subText}>{props.subText}</div>
        </div>
    )
};

AnimationButton.defaultProps = defaultProps;

export default AnimationButton;
