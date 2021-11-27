import React, {useCallback, useMemo, useState} from "react";
import EyecatchTitleBG01 from '../assets/img/eyecatch_title_BG_01.png';
import EyecatchTitleBG02 from '../assets/img/eyecatch_title_BG_02.png';
import EyecatchTitleBG03 from '../assets/img/eyecatch_title_BG_03.png';
import EyecatchTitleBG04 from '../assets/img/eyecatch_title_BG_04.png';
import EyecatchTitleBG05 from '../assets/img/eyecatch_title_BG_05.png';
import EyecatchTitleBG06 from '../assets/img/eyecatch_title_BG_06.png';
import EyecatchTitleBG07 from '../assets/img/eyecatch_title_BG_07.png';
import EyecatchTitleBG08 from '../assets/img/eyecatch_title_BG_08.png';
import EyecatchTitleBG09 from '../assets/img/eyecatch_title_BG_09.png';
import EyecatchTitleBG10 from '../assets/img/eyecatch_title_BG_10.png';
import EyecatchTitleBG11 from '../assets/img/eyecatch_title_BG_11.png';
import EyecatchTitleBG12 from '../assets/img/eyecatch_title_BG_12.png';
import EyecatchTitleBG13 from '../assets/img/endback1.png';
import EyecatchTitleBG14 from '../assets/img/endback1_hikari.png';
import EyecatchTitle01 from '../assets/img/eyecatch_title_01.png';
import EyecatchTitle02 from '../assets/img/eyecatch_title_02.png';
import EyecatchTitle03 from '../assets/img/eyecatch_title_03.png';
import EyecatchTitle04 from '../assets/img/eyecatch_title_04.png';
import EyecatchTitle05 from '../assets/img/eyecatch_title_05.png';
import EyecatchTitle06 from '../assets/img/eyecatch_title_06.png';
import EyecatchTitle07 from '../assets/img/eyecatch_title_07.png';
import EyecatchTitle08 from '../assets/img/eyecatch_title_08.png';
import EyecatchTitle09 from '../assets/img/eyecatch_title_09.png';
import EyecatchTitle10 from '../assets/img/eyecatch_title_10.png';
import EyecatchTitle11 from '../assets/img/eyecatch_title_11.png';
import EyecatchTitle12 from '../assets/img/eyecatch_title_12.png';
import ShinkuEnd1 from '../assets/img/shinku_end1.png';
import ShinkuEnd2 from '../assets/img/shinku_end2.png';
import ShinkuEnd3 from '../assets/img/shinku_end3.png';
import ShinkuEnd4 from '../assets/img/shinku_end4.png';
import ShinkuEnd5 from '../assets/img/shinku_end5.png';
import ShinkuEnd6 from '../assets/img/shinku_end6.png';
import ShinkuEnd7 from '../assets/img/shinku_end7.png';
import ShinkuEnd8 from '../assets/img/shinku_end1_hikari.png';
import ShinkuEnd9 from '../assets/img/shinku_end2_hikari.png';
import ShinkuEnd10 from '../assets/img/shinku_end3_hikari.png';
import ShinkuEnd11 from '../assets/img/shinku_end4_hikari.png';
import ShinkuEnd12 from '../assets/img/shinku_end5_hikari.png';
import ShinkuEnd13 from '../assets/img/shinku_end6_hikari.png';
import ShinkuEnd14 from '../assets/img/shinku_end7_hikari.png';

import TitleBg1A from '../assets/img/title_bg1_A.png';
import TitleBg1B from '../assets/img/title_bg1_B.png';
import TitleBg1C from '../assets/img/title_bg1_C.png';
import TitleBg1D from '../assets/img/title_bg1_D.png';
import TitleLogo from '../assets/img/title_logo1.png';
import ShinkuDanjobi from '../assets/img/shinku_danjobi.png';
import Progress from '../assets/img/progress.png';
import LoadDataBackground from '../assets/img/load_data_background.png';
import LoadDataBoxBackground from '../assets/img/load_data_box_background.png';
import ArticleBg from '../assets/img/article_bg.png';
import LoadingBg from "../components/loading_bg/LoadingBg";

import ChatAvatarShinkuBg from '../assets/img/chat_avatar_shinku.png';
import HistoryAvatarShinkuBg from '../assets/img/history_avatar_shinku.png';
import FCPlay from '../assets/img/fc_play_1.png';
import FCPlayHover from '../assets/img/fc_play_2.png';
import ArticleBook from '../assets/img/article_book.png';
import SysWindowLeft from '../assets/img/sys_window_left.png';
import SysWindowRight from '../assets/img/sys_window_right.png';

import './app_context_wrapper.css';

type GameAssetItem = {
    bg: string,
    title: string,
    gallery: string
}

type BgAssets = {
    [key in keyof BgAssetsResult]: string
}

type GameAssets = Array<GameAssetItem>

type GameAssetsLoadResultItem = {
    [key in keyof GameAssetItem]: HTMLImageElement
}

export type GameAssetsResult = Array<GameAssetsLoadResultItem>

export type BgAssetsResult = {
    titleBgA: HTMLImageElement,
    titleBgB: HTMLImageElement,
    titleBgC: HTMLImageElement,
    titleBgD: HTMLImageElement,
    titleLogo: HTMLImageElement,
    loadDataBackground: HTMLImageElement,
    loadDataBoxBackground: HTMLImageElement,
    progress: HTMLImageElement,
    articleBg: HTMLImageElement,
    chatAvatarShinkuBg: HTMLImageElement,
    historyAvatarShinkuBg: HTMLImageElement
    articleBook: HTMLImageElement,
    fcPlay: HTMLImageElement,
    fcPlayHover: HTMLImageElement,
    sysWindowLeft: HTMLImageElement,
    sysWindowRight: HTMLImageElement
}

type AppContext = {
    preloadGameAssets: (onLoad?: (eventObj: Object) => void, hideLoading?: boolean) => Promise<void>
    preloadBgAssets: (onLoad?: (eventObj: Object) => void, hideLoading?: boolean) => Promise<void>
    preloadBgm: (onLoad?: (eventObj: Object) => void, hideLoading?: boolean) => Promise<void>
    getGameAssetsResult: () => GameAssetsResult | undefined
    getBgAssetsResult: () => BgAssetsResult | undefined,
    playBgm: (id: string, replay?: boolean, onPlaying?: (ev: Event) => void) => Promise<void>,
    stopBgm: (id: string) => void,
    showWhiteBg: () => Promise<void>,
    hideWhiteBg: () => Promise<void>,
    hideLoadingAssets: () => void
}


export const appContext = React.createContext<AppContext>({
    preloadGameAssets: () => new Promise<void>(() => {}),
    preloadBgAssets: () => new Promise<void>(() => {}),
    preloadBgm: () => new Promise<void>(() => {}),
    getGameAssetsResult: () => undefined,
    getBgAssetsResult: () => undefined,
    playBgm: () => Promise.resolve(),
    stopBgm: () => {},
    showWhiteBg: () => Promise.resolve(),
    hideWhiteBg: () => Promise.resolve(),
    hideLoadingAssets: () => {}
})

const gameAssets: GameAssets = [
    {
        bg: EyecatchTitleBG01,
        title: EyecatchTitle01,
        gallery: ShinkuEnd1
    },
    {
        bg: EyecatchTitleBG02,
        title: EyecatchTitle02,
        gallery: ShinkuEnd2
    },
    {
        bg: EyecatchTitleBG03,
        title: EyecatchTitle03,
        gallery: ShinkuEnd3
    },
    {
        bg: EyecatchTitleBG04,
        title: EyecatchTitle04,
        gallery: ShinkuEnd4
    },
    {
        bg: EyecatchTitleBG05,
        title: EyecatchTitle05,
        gallery: ShinkuEnd5
    },
    {
        bg: EyecatchTitleBG06,
        title: EyecatchTitle06,
        gallery: ShinkuEnd6
    },
    {
        bg: EyecatchTitleBG07,
        title: EyecatchTitle07,
        gallery: ShinkuEnd7
    },
    {
        bg: EyecatchTitleBG08,
        title: EyecatchTitle08,
        gallery: ShinkuEnd8
    },
    {
        bg: EyecatchTitleBG09,
        title: EyecatchTitle09,
        gallery: ShinkuEnd9
    },
    {
        bg: EyecatchTitleBG10,
        title: EyecatchTitle10,
        gallery: ShinkuEnd10
    },
    {
        bg: EyecatchTitleBG11,
        title: EyecatchTitle11,
        gallery: ShinkuEnd11
    },
    {
        bg: EyecatchTitleBG12,
        title: EyecatchTitle12,
        gallery: ShinkuEnd12
    },
    {
        bg: EyecatchTitleBG13,
        title: '',
        gallery: ShinkuEnd13
    },
    {
        bg: EyecatchTitleBG14,
        title: '',
        gallery: ShinkuEnd14
    },
    {
        bg: ShinkuDanjobi,
        title: '',
        gallery: ''
    }
];

const bgAssets: BgAssets = {
    titleBgA: TitleBg1A,
    titleBgB: TitleBg1B,
    titleBgC: TitleBg1C,
    titleBgD: TitleBg1D,
    titleLogo: TitleLogo,
    loadDataBackground: LoadDataBackground,
    loadDataBoxBackground: LoadDataBoxBackground,
    progress: Progress,
    articleBg: ArticleBg,
    chatAvatarShinkuBg: ChatAvatarShinkuBg,
    historyAvatarShinkuBg: HistoryAvatarShinkuBg,
    articleBook: ArticleBook,
    fcPlay: FCPlay,
    fcPlayHover: FCPlayHover,
    sysWindowLeft: SysWindowLeft,
    sysWindowRight: SysWindowRight
};

const bgms = [
    {
        id: 'main_bgm',
        src: `${process.env.PUBLIC_URL}/main_bgm.mp3`,
        loop: true
    },
    {
        id: 'world_end_love_bgm',
        src: `${process.env.PUBLIC_URL}/world_end_love.mp3`,
        loop: false
    },
    {
        id: 'start',
        src: `${process.env.PUBLIC_URL}/start.wav`,
        loop: false
    },
    {
        id: 'hover',
        src: `${process.env.PUBLIC_URL}/hover.wav`,
        loop: false
    },
    {
        id: 'animation_btn_click',
        src: `${process.env.PUBLIC_URL}/sekai_btn_click.wav`,
        loop: false
    },
    {
        id: 'sekai_card_box_click',
        src: `${process.env.PUBLIC_URL}/sekai_card_box_click.wav`,
        loop: false
    },
    {
        id: 'sekai_card_box_no_data_click',
        src: `${process.env.PUBLIC_URL}/sekai_card_box_no_data_click.wav`,
        loop: false
    }
];

const AppContextWrapper: React.FC = (props) => {

    const [gameAssetsResult, setGameAssetsResult] = useState<GameAssetsResult>([]);
    const [bgAssetsResult, setBgAssetsResult] = useState<BgAssetsResult | undefined>(undefined);
    const [isLoadAssets, setLoadAssets] = useState(false);
    const [loadText, setLoadText] = useState('');
    const [subLoadText, setSubLoadText] = useState('');
    const [isShowWhite, setShowWhite] = useState(false);

    const preloadGameAssets = useCallback((onLoad?: (eventObj: Object) => void, hideLoading: boolean = false) => {

        let completeCount = 0;
        setLoadAssets(true);
        setLoadText('加载资源图片中...')
        setSubLoadText(`(...)`);

        if (gameAssetsResult.length !== 0) {
            if (hideLoading) {
                setLoadAssets(false);
            } else {
                setLoadText('加载资源图片完成啦～')
            }
            return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
            const newGameAssetsResult = gameAssets.map((gameAssetItem) => {
                const totalCount = gameAssets.length * Object.keys(gameAssetItem).length;

                const onloadend = () => {
                    completeCount++;
                    setSubLoadText(`(${completeCount}/${totalCount})`);
                    if (onLoad) {
                        onLoad({complete: completeCount, all: totalCount});
                    }
                    if (completeCount === totalCount) {
                        if (hideLoading) {
                            setLoadAssets(false);
                        } else {
                            setLoadText('加载资源图片完成啦～')
                        }
                        resolve();
                    }
                };

                return mapEntryToImageObjects(gameAssetItem, onloadend) as GameAssetsLoadResultItem;
            });
            setGameAssetsResult(newGameAssetsResult);
        });
    } , [gameAssetsResult.length]);

    const preloadBgAssets = useCallback((onLoad?: (eventObj: Object) => void, hideLoading: boolean = false) => {
        let completeCount = 0;
        let totalCount = Object.entries(bgAssets).length;
        setLoadAssets(true);
        setLoadText('加载背景图片中...')
        setSubLoadText(`(...)`);
        if (bgAssetsResult) {
            if (hideLoading) {
                setLoadAssets(false);
            } else {
                setLoadText('加载背景图片完成啦～')
            }
            return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
            const onloadend = () => {
                completeCount++;
                setSubLoadText(`(${completeCount}/${totalCount})`);
                if (onLoad) {
                    onLoad({complete: completeCount, all: totalCount});
                }
                if (completeCount === totalCount) {
                    if (hideLoading) {
                        setLoadAssets(false);
                    } else {
                        setLoadText('加载背景图片完成啦～')
                    }
                    resolve();
                }
            };
            const newBgAssetsResult = mapEntryToImageObjects(bgAssets, onloadend) as BgAssetsResult;
            setBgAssetsResult(newBgAssetsResult);
        });
    }, [bgAssetsResult]);

    const preloadBgm = useCallback((onLoad?: (eventObj: Object) => void, hideLoading: boolean = false) => {

        let completeCount = 0;
        setLoadAssets(true);
        setLoadText('加载音频中...');
        setSubLoadText(`(...)`);

        if (bgms.map(
            bgm => document.getElementById(bgm.id) as HTMLAudioElement
        ).every(audio => audio.readyState === 4)
        ) {
            if (hideLoading) {
                setLoadAssets(false);
            } else {
                setLoadText('加载音频完成啦～')
            }
            return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
            bgms.forEach((bgm) => {
                const audio = document.getElementById(bgm.id) as HTMLAudioElement | null;
                if (audio) {
                    audio.oncanplaythrough = () => {
                        completeCount++;
                        setSubLoadText(`(${completeCount}/${bgms.length})`);
                        audio.oncanplaythrough = null;
                        if (onLoad) {
                            onLoad({complete: completeCount, all: bgms.length});
                        }
                        if (completeCount === bgms.length) {
                            if (hideLoading) {
                                setLoadAssets(false);
                            } else {
                                setLoadText('加载音频完成啦～')
                            }
                            resolve();
                        }
                    };
                    audio.load();
                }
            });
        });
    }, []);

    const getGameAssetsResult = useCallback(() => [...gameAssetsResult], [gameAssetsResult]);

    const getBgAssetsResult = useCallback(() => bgAssetsResult && {...bgAssetsResult}, [bgAssetsResult]);

    const playBgm = useCallback(async (id: string, replay: boolean = false, onPlaying?: (ev: Event) => void) => {
        const bgm = bgms.find(bgm => bgm.id === id);
        if (bgm) {
            const audio = document.getElementById(bgm.id) as HTMLAudioElement;
            if (replay) {
                audio.load();
            }
            audio.ontimeupdate = onPlaying || null;
            await audio.play();
            return new Promise<void>((resolve) => {
                audio.onended = () => {
                    audio.onended = null;
                    audio.ontimeupdate = null;
                    resolve();
                }
            });
        } else {
            return Promise.reject()
        }
    }, []);

    const stopBgm = useCallback((id: string) => {
        const bgm = bgms.find(bgm => bgm.id === id);
        if (bgm) {
            const audio = document.getElementById(bgm.id) as HTMLAudioElement
            const id = setInterval(() => {
                if (audio.volume < 0.05) {
                    clearInterval(id);
                    audio.volume = 0
                    audio.onended = null;
                    audio.ontimeupdate = null;
                    audio.pause();
                    audio.load();
                    audio.volume = 1;
                } else {
                    audio.volume -= 0.05;
                }
            }, 200);
        }
    }, []);

    const showWhiteBg = useCallback(() => {
        setShowWhite(true);
        const whiteDiv = document.getElementById('white-div') as HTMLDivElement;
        whiteDiv.className = 'show-white-bg';
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000);
        })
    }, [])

    const hideWhiteBg = useCallback(() => {
        const whiteDiv = document.getElementById('white-div') as HTMLDivElement
        whiteDiv.className = 'hide-white-bg';
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
                setShowWhite(false);
            }, 2000);
        });

    }, [])

    const hideLoadingAssets = useCallback(() => setLoadAssets(false), []);

    const mapEntryToImageObjects = (obj: Object, onloadend: () => void) => {
        return Object.entries(obj).map(entry => {
            const key = entry[0]
            const value: HTMLImageElement = new Image();
            if (!entry[1]) {
                onloadend();
            } else {
                value.src = entry[1];
                value.onload = onloadend;
            }
            return { [key]: value };
        }).reduce((prev, next) => ({
            ...prev,
            ...next
        }));
    };

    //解决巨难受的appContextValue重复刷新的问题
    const appContextValue = useMemo(() => ({
        preloadGameAssets,
        preloadBgAssets,
        preloadBgm,
        getGameAssetsResult,
        getBgAssetsResult,
        playBgm,
        stopBgm,
        showWhiteBg,
        hideWhiteBg,
        hideLoadingAssets
    }), [getBgAssetsResult, getGameAssetsResult, hideLoadingAssets, hideWhiteBg, playBgm, preloadBgAssets, preloadBgm, preloadGameAssets, showWhiteBg, stopBgm]);

    return (
        <>
            <div id={'white-div'} style={{
                display: isShowWhite ? 'block' : 'none',
                position: "fixed",
                width: '100vw',
                height: '100vh',
                opacity: 0,
                zIndex: 99999,
                backgroundColor: "white"
            }}/>
            <LoadingBg show={isLoadAssets} loadingText={loadText} subLoadingText={subLoadText}/>
            {
                bgms.map(bgm => (<audio
                    key={`audio-${bgm.id}`}
                    id={bgm.id} src={bgm.src}
                    loop={bgm.loop}
                    preload={'none'}/>
                ))
            }
            <appContext.Provider value={appContextValue}>
                {props.children}
            </appContext.Provider>
        </>
    );
};

export default AppContextWrapper;
