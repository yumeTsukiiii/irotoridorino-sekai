import React, {CSSProperties} from 'react';
import MainWindowImg from '../../assets/img/main_window.png';
import './main_window.css';

type MainWindowProps = {
    name: string,
    text: string,
    characterImg?: string,
    onClick?: () => any
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    open: true as boolean,
    hidden: false as boolean,
    textColor: '#f7dd81' as string,
    bottom: '2vh' as string
};

const MainWindow: React.FC<MainWindowProps> = (props: MainWindowProps) => {

    const styles = {
        root: {
            width: '100%',
            position: "absolute",
            bottom: props.bottom,
            transition: 'opacity 0.3s, visibility 0.3s, transform 0.3s',
            transform: `translateY(${props.open ? '0%' : '100%'})`,
            opacity: props.open ? 1 : 0,
            visibility: props.open ? "visible" : "hidden"
        } as CSSProperties,
        bgContainer: {
            width: '100%',
            display: "flex",
            justifyContent: "center"
        } as CSSProperties,
        textContainer: {
            position: "absolute",
            left: '11%',
            right: '11%',
            top: '13%',
            bottom: '13%',
            display: "flex",
            overflow: "auto"
        } as CSSProperties,
        text: {
            textShadow: `1px 1px .1em ${props.textColor}, -1px -1px .1em ${props.textColor}, 1px -1px .1em ${props.textColor}, -1px 1px .1em ${props.textColor}`
        } as CSSProperties
    };

    const handleTextOverFlowScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }

    return (
        <div style={styles.root}>
            <div style={styles.bgContainer} onClick={props.onClick}>
                <img alt={'main_window'} src={MainWindowImg} width={'95%'}/>
            </div>
            <div style={styles.textContainer} onWheel={handleTextOverFlowScroll}>
                <p className={'text'} style={{
                    ...styles.text,
                    zIndex: 15,
                    flexShrink: 0
                }}>{props.name}</p>
                <div style={{width: '2.5vw', flexShrink: 0}}/>
                <p className={'text'} style={{
                    ...styles.text,
                    flexGrow: 1,
                    zIndex: 17,
                    textOverflow: "ellipsis"
                }}>{props.text}</p>
            </div>
            {props.characterImg && (
                <img style={{
                    position: "absolute",
                    left: 0,
                    bottom: `calc(-${props.bottom ?? 0})`,
                    width: '25vw',
                    zIndex: 16
                }}
                src={props.characterImg}
                alt={'character-avatar'}/>
            )}
        </div>
    );
};

MainWindow.defaultProps = defaultProps;

export default MainWindow;
