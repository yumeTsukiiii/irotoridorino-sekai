import React, {CSSProperties} from 'react';
import MainWindowImg from '../../assets/img/main_window.png';
import './main_window.css';

type MainWindowProps = {
    name: string,
    text: string
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    textColor: '#f7dd81' as string,
    bottom: '2vh' as string
};

const MainWindow: React.FC<MainWindowProps> = (props: MainWindowProps) => {

    const styles = {
        root: {
            width: '100%',
            position: "absolute",
            bottom: props.bottom
        } as CSSProperties,
        bgContainer: {
            width: '100%',
            display: "flex",
            justifyContent: "center"
        } as CSSProperties,
        textContainer: {
            position: "absolute",
            left: '11%',
            top: '13%',
            display: "flex",
            width: '100%'
        } as CSSProperties,
        text: {
            textShadow: `1px 1px .1em ${props.textColor}, -1px -1px .1em ${props.textColor}, 1px -1px .1em ${props.textColor}, -1px 1px .1em ${props.textColor}`
        } as CSSProperties
    };

    return (
        <div style={styles.root}>
            <div style={styles.bgContainer}>
                <img alt={'main_window'} src={MainWindowImg} width={'95%'}/>
            </div>
            <div style={styles.textContainer}>
                <p className={'text'} style={styles.text}>{props.name}</p>
                <div style={{width: '2.5vw'}}/>
                <p className={'text'} style={{
                    ...styles.text,
                    maxWidth: '70%'
                }}>{props.text}</p>
            </div>
        </div>
    );
};

MainWindow.defaultProps = defaultProps;

export default MainWindow;
