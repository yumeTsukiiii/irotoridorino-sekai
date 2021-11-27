// noinspection JSIgnoredPromiseFromCall

import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import TitleBg1A from '../../assets/img/title_bg1_A.png';
import TitleBg1B from '../../assets/img/title_bg1_B.png';
import TitleBg1C from '../../assets/img/title_bg1_C.png';
import TitleBg1D from '../../assets/img/title_bg1_D.png';
import TitleLogo from '../../assets/img/title_logo1.png';
import './main.css';
import AnimationButton from "../../components/anime_button/AnimationButton";
import {useNavigate} from "react-router";
import {appContext} from "../../context/AppContextWrapper";
import Article from "../article";

type MainProps = {

} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {

};

const Main: React.FC<MainProps> = () => {

    const navigate = useNavigate();

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
            top: '27vw'
        } as CSSProperties
    };

    const [isArticlePageOpen, setArticlePageOpen] = useState(false);

    const handleWorldEndLoveClick = () => {
        ctx.playBgm('start');
        ctx.showWhiteBg().then(() => {
            ctx.hideWhiteBg();
            ctx.stopBgm('main_bgm')
            navigate('/world_end_love');
        });
    };

    const handleArticleBtnClick = () => {
        ctx.playBgm('animation_btn_click');
        setArticlePageOpen(true);
    };

    const handleArticlePageExitBtnClick = () => {
        setArticlePageOpen(false);
    }

    const handleArticlePageContextMenuClick = () => {
        setArticlePageOpen(false);
    };

    const handleBtnHover = () => {
        ctx.playBgm('hover', true);
    };

    const ctx = useContext(appContext);

    useEffect(() => {
        if (ctx.getGameAssetsResult()?.length === 0) {
            navigate('/', { replace: true });
            return;
        }
        ctx.playBgm('main_bgm');
    }, [ctx, navigate]);

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
                <div style={{height: '2vh'}}/>
                <AnimationButton
                    onClick={handleArticleBtnClick}
                    mainText={'Article'}
                    subTextLetterSpacing={'24px'}
                    subText={'文章'}
                    onHover={handleBtnHover}/>
            </div>
            <Article
                open={isArticlePageOpen}
                onExitClick={handleArticlePageExitBtnClick}
                onContextMenuClick={handleArticlePageContextMenuClick}/>
        </div>
    )
};

export default Main;

Main.defaultProps = defaultProps;
