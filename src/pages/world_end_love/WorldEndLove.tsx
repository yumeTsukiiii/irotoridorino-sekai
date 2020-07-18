import React, {CSSProperties, useContext, useEffect} from 'react';
import Background from "../../components/background/Background";
import FeatherBackground from "../../components/feather_background/FeatherBackground";
import Center from "../../components/center/Center";
import './world_end_love.css';
import {appContext, BgAssetsResult, GameAssetsResult} from "../../context/AppContextWrapper";
import {useHistory} from "react-router";

type WorldEndLoveProps = {

} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {

};

const WorldEndLove: React.FC<WorldEndLoveProps> = (props: WorldEndLoveProps) => {

    const styles = {
        root: {
            height: '100vh',
            width: '100vw',
            position: "relative"
        } as CSSProperties,
        bgContainer: {
            height: '100vh',
            width: '100vw',
            position: "absolute"
        } as CSSProperties,
        bg: {
            opacity: 0
        } as CSSProperties,
        title: {
            position: "absolute",
            left: 0,
            right: 0,
            top: '3vh'
        } as CSSProperties,
        titleImage: {
            opacity: 0
        } as CSSProperties,
        shinkuGallery: {
            width: '100vw',
            height: '100vh',
            position: "absolute",
            top: 0
        } as CSSProperties,
        shinkuGalleryImg: {
            width: '50%',
            opacity: 0
        } as CSSProperties,
        lastText: {
            opacity: 0,
            color: "white",
            fontSize: '3em',
            fontWeight: 570,
            maxWidth: '70%',
            textShadow: '1px 1px 1em #f7dd81, -1px -1px 1em #f7dd81, 1px -1px 1em #f7dd81, -1px 1px 1em #f7dd81'
        } as CSSProperties,
        progress: {
            width: '96px',
            position: "absolute",
            bottom: 0,
            left: 0
        } as CSSProperties
    };

    const ctx = useContext(appContext);
    const history = useHistory();
    const gameAssetsResult = ctx.getGameAssetsResult() as GameAssetsResult;
    const bgAssetsResult = ctx.getBgAssetsResult() as BgAssetsResult;

    useEffect(() => {
        if (gameAssetsResult.length === 0) {
            history.replace("/");
            return;
        }
        setTimeout(() => {
            ctx.playBgm('world_end_love_bgm', false, (ev => {
                const audio = ev.target as HTMLAudioElement;
                const progressImg = document.getElementById('progress-img') as HTMLImageElement;
                const radio = (audio.currentTime / audio.duration);
                progressImg.style.transform = `translateX(${radio * (window.innerWidth - 96)}px)`;
            })).then(() => {
                ctx.showWhiteBg().then(() => {
                    ctx.hideWhiteBg();
                    history.replace('/main');
                });
            });
        }, 1500);
        return () => {
            ctx.stopBgm('world_end_love_bgm');
        };
    }, [ctx, history, gameAssetsResult.length]);

    return (
        <div style={styles.root}>
            {
                gameAssetsResult.map((item, index) => (
                    <>
                        <div style={styles.bgContainer}>
                            <div style={styles.bg} className={`bg-${index + 1}`}>
                                <Background src={item.bg.src}/>
                            </div>
                        </div>
                        {
                            item.gallery.src && <Center style={styles.shinkuGallery}>
                                <img
                                    className={`gallery-${index + 1}`}
                                    style={styles.shinkuGalleryImg}
                                    alt={'shinku_gallery'} src={item.gallery.src}/>
                            </Center>
                        }
                        {
                            item.title.src && <Center style={styles.title}>
                                <img
                                    style={styles.titleImage}
                                    className={`bg-title-${index + 1}`}
                                    alt={'title_image'}
                                    src={item.title.src}/>
                            </Center>
                        }
                    </>
                ))
            }
            <div style={styles.bgContainer}>
                <FeatherBackground/>
            </div>
            <Center style={styles.title}>
                <p
                    className={'danjobi-text'}
                    style={styles.lastText}>
                    誕生日おめでとう
                </p>
            </Center>
            <Center style={styles.title}>
                <p
                    className={'suki-text'}
                    style={styles.lastText}>
                    つっと、大好きだ
                </p>
            </Center>
            <img
                id={'progress-img'}
                style={styles.progress}
                alt={'progress'} src={bgAssetsResult?.progress?.src || ''}/>
        </div>
    );
};

WorldEndLove.defaultProps = defaultProps;

export default WorldEndLove;
