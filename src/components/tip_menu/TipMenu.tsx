import React, {CSSProperties, MouseEventHandler, useEffect, useState} from 'react';
import MenuBg from '../../assets/img/menu_bg.png';
import './tip_menu.css';

type TipMenuProps = {
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
    width: '612px' as string
};

const TipMenu: React.FC<TipMenuProps> = (props: TipMenuProps) => {

    const styles = {
        root: {
            position: "relative"
        } as CSSProperties,
        tipText: {
            position: "absolute",
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            color: "white",
            fontSize: '2em',
            maxWidth: '70%',
            textShadow: '1px 1px .1em #7ef5f7, -1px -1px .1em #7ef5f7, 1px -1px .1em #7ef5f7, -1px 1px .1em #7ef5f7'
        } as CSSProperties,
        yesText: {
            position: "absolute",
            bottom: '35%',
            left: '30%',
            color: "white",
            fontSize: '2em',
            textShadow: '1px 1px .1em #7ef5f7, -1px -1px .1em #7ef5f7, 1px -1px .1em #7ef5f7, -1px 1px .1em #7ef5f7'
        } as CSSProperties,
        noText: {
            position: "absolute",
            bottom: '35%',
            right: '30%',
            color: "white",
            fontSize: '2em',
            textShadow: '1px 1px .1em #7ef5f7, -1px -1px .1em #7ef5f7, 1px -1px .1em #7ef5f7, -1px 1px .1em #7ef5f7'
        } as CSSProperties,
        bottomText: {
            position: "absolute",
            bottom: '8%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            color: "white",
            fontSize: '1em',
            maxWidth: '70%',
            textShadow: '1px 1px .1em #7ef5f7, -1px -1px .1em #7ef5f7, 1px -1px .1em #7ef5f7, -1px 1px .1em #7ef5f7'
        } as CSSProperties
    };

    const [display, setDisplay] = useState('none');
    const [anime, setAnime] = useState('hidden');

    useEffect(() => {
        if (display === 'none') {
            setDisplay(props.show ? 'block' : 'none');
        }
    }, [props.show, display]);

    useEffect(() => {
        setAnime(props.show ? 'shown' : 'hidden');
    }, [props.show]);

    const YesText = () => (props.showYes ? (
        <button
            onClick={props.onYesClick}
            className={'action'} style={styles.yesText}>{props.yesText}</button>
    ) : null);

    const NoText = () => (props.showNo ? (
        <button
            onClick={props.onNoClick}
            className={'action'} style={styles.noText}>{props.noText}</button>
    ) : null);

    return (
        <div
            className={anime}
            style={{
                ...styles.root,
                display: display
            }}
            onClick={props.onMenuClick}>
            <img alt={'menu_bg'} src={MenuBg} width={props.width}/>
            <p style={styles.tipText}>{props.tipText}</p>
            <YesText/>
            <NoText/>
            <p style={styles.bottomText}>{props.bottomText}</p>
        </div>
    )
};

TipMenu.defaultProps = defaultProps;

export default TipMenu;
