import React, {CSSProperties, useContext, useEffect} from 'react';
import TitleBg1A from '../../assets/img/title_bg1_A.png';
import TitleBg1B from '../../assets/img/title_bg1_B.png';
import TitleBg1C from '../../assets/img/title_bg1_C.png';
import TitleBg1D from '../../assets/img/title_bg1_D.png';
import TitleLogo from '../../assets/img/title_logo1.png';
import './main.css';
import AnimationButton from "../../components/anime_button/AnimationButton";
import {useHistory} from "react-router";
import {appContext} from "../../context/AppContextWrapper";

type MainProps = {

} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {

};

const Main: React.FC<MainProps> = (props: MainProps) => {

    const history = useHistory();

    const bg = {
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
    };

    const styles = {
        root: {
            height: '100vh',
            width: '100vw',
            position: "relative",
            overflow: "hidden"
        } as CSSProperties,
        bgContainer: {
            height: '100vh',
            width: '100vw',
            position: "relative"
        } as CSSProperties,
        logo: {
            position: "absolute",
            width: '73vw',
            right: '1%',
            top: '5%'
        } as CSSProperties,
        bgA: {
            position: "absolute",
            height: '100%',
            width: '100%',
            backgroundImage: `url('${TitleBg1A}')`,
            ...bg
        } as CSSProperties,
        bgB: {
            position: "absolute",
            height: '100%',
            width: '100%',
            backgroundImage: `url('${TitleBg1B}')`,
            ...bg
        } as CSSProperties,
        bgC: {
            position: "absolute",
            height: '100%',
            width: '100%',
            backgroundImage: `url('${TitleBg1C}')`,
            ...bg,
            backgroundRepeat: "repeat-y",
            backgroundSize: "contain"
        } as CSSProperties,
        bgD: {
            position: "absolute",
            height: '100%',
            width: '100%',
            backgroundImage: `url('${TitleBg1D}')`,
            ...bg,
            backgroundRepeat: "repeat-y",
            backgroundSize: "contain"
        } as CSSProperties,
        actionsContainer: {
            position: "absolute",
            right: '8%',
            bottom: '40%'
        } as CSSProperties
    };

    const handleWorldEndLoveClick = () => {
        ctx.playBgm('start');
        ctx.showWhiteBg().then(() => {
            ctx.hideWhiteBg();
            history.push('/world_end_love');
        });
    };

    const handleBtnHover = () => {
        ctx.playBgm('hover', true);
    };

    const ctx = useContext(appContext);

    useEffect(() => {
        if (ctx.getGameAssetsResult()?.length === 0) {
            history.replace('/');
            return;
        }
        ctx.playBgm('main_bgm');
        return () => {
            ctx.stopBgm('main_bgm');
        };
    }, [ctx, history]);

    return (
        <div style={styles.root}>
            <div className={'bg-container-transform'} style={styles.bgContainer}>
                <div style={styles.bgA}/>
                <div style={styles.bgB}/>
                <div className={'bg-C-transform'} style={styles.bgC}/>
                <div className={'bg-D-transform'} style={styles.bgD}/>
            </div>
            <img
                className={'logo'}
                style={styles.logo}
                alt={'logo'} src={TitleLogo}/>
            <div className={'actions'} style={styles.actionsContainer}>
                <AnimationButton
                    onClick={handleWorldEndLoveClick}
                    mainText={'World\'s end love'}
                    subTextLetterSpacing={'24px'}
                    subText={'アレセイア'}
                    onHover={handleBtnHover}/>
            </div>
        </div>
    )
};

export default Main;

Main.defaultProps = defaultProps;
