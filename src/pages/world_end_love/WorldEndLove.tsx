import React, {CSSProperties, useContext, useEffect} from 'react';
import Background from "../../components/background/Background";
import EyecatchTitleBG01 from '../../assets/img/eyecatch_title_BG_01.png';
import EyecatchTitleBG02 from '../../assets/img/eyecatch_title_BG_02.png';
import EyecatchTitleBG03 from '../../assets/img/eyecatch_title_BG_03.png';
import EyecatchTitleBG04 from '../../assets/img/eyecatch_title_BG_04.png';
import EyecatchTitleBG05 from '../../assets/img/eyecatch_title_BG_05.png';
import EyecatchTitleBG06 from '../../assets/img/eyecatch_title_BG_06.png';
import EyecatchTitleBG07 from '../../assets/img/eyecatch_title_BG_07.png';
import EyecatchTitleBG08 from '../../assets/img/eyecatch_title_BG_08.png';
import EyecatchTitleBG09 from '../../assets/img/eyecatch_title_BG_09.png';
import EyecatchTitleBG10 from '../../assets/img/eyecatch_title_BG_10.png';
import EyecatchTitleBG11 from '../../assets/img/eyecatch_title_BG_11.png';
import EyecatchTitleBG12 from '../../assets/img/eyecatch_title_BG_12.png';
import EyecatchTitleBG13 from '../../assets/img/endback1.png';
import EyecatchTitleBG14 from '../../assets/img/endback1_hikari.png';
import EyecatchTitle01 from '../../assets/img/eyecatch_title_01.png';
import EyecatchTitle02 from '../../assets/img/eyecatch_title_02.png';
import EyecatchTitle03 from '../../assets/img/eyecatch_title_03.png';
import EyecatchTitle04 from '../../assets/img/eyecatch_title_04.png';
import EyecatchTitle05 from '../../assets/img/eyecatch_title_05.png';
import EyecatchTitle06 from '../../assets/img/eyecatch_title_06.png';
import EyecatchTitle07 from '../../assets/img/eyecatch_title_07.png';
import EyecatchTitle08 from '../../assets/img/eyecatch_title_08.png';
import EyecatchTitle09 from '../../assets/img/eyecatch_title_09.png';
import EyecatchTitle10 from '../../assets/img/eyecatch_title_10.png';
import EyecatchTitle11 from '../../assets/img/eyecatch_title_11.png';
import EyecatchTitle12 from '../../assets/img/eyecatch_title_12.png';
import ShinkuEnd1 from '../../assets/img/shinku_end1.png';
import ShinkuEnd2 from '../../assets/img/shinku_end2.png';
import ShinkuEnd3 from '../../assets/img/shinku_end3.png';
import ShinkuEnd4 from '../../assets/img/shinku_end4.png';
import ShinkuEnd5 from '../../assets/img/shinku_end5.png';
import ShinkuEnd6 from '../../assets/img/shinku_end6.png';
import ShinkuEnd7 from '../../assets/img/shinku_end7.png';
import ShinkuEnd8 from '../../assets/img/shinku_end1_hikari.png';
import ShinkuEnd9 from '../../assets/img/shinku_end2_hikari.png';
import ShinkuEnd10 from '../../assets/img/shinku_end3_hikari.png';
import ShinkuEnd11 from '../../assets/img/shinku_end4_hikari.png';
import ShinkuEnd12 from '../../assets/img/shinku_end5_hikari.png';
import ShinkuEnd13 from '../../assets/img/shinku_end6_hikari.png';
import ShinkuEnd14 from '../../assets/img/shinku_end7_hikari.png';
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
        return () => {
            ctx.stopBgm('world_end_love_bgm');
        };
    }, []);

    useEffect(() => {
        if (gameAssetsResult.length === 0) return;
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
    }, []);

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
