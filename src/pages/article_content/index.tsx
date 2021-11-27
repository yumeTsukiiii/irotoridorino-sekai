import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import ArticleBg from '../../assets/img/article_bg.png';
import ArticleBook from '../../assets/img/article_book.png';
import MainWindow from "../../components/main_window/MainWindow";
import ChatAvatarShinkuBg from '../../assets/img/chat_avatar_shinku.png'
import Shinku1 from "../../assets/img/shinku_1.png";
import {useRouteMatch, useHistory} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import classes from './index.module.css';
import WindowTipMenu from "../../components/window_tip_menu";
import ArticleContentsHistory, {HistoryContent} from "../article_contents_history";
import SekaiSettings from "../sekai_settings";
import {appContext} from "../../context/AppContextWrapper";

const NOT_CHANGE_CONTENT_FLAG = '\0';

type Content = {
    chat: string,
    content: string|null
}

let jumpIndex: number | null = null;

const ArticleContent: React.FC = () => {

    const routeMatch = useRouteMatch<{articleId: string}>();
    const ctx = useContext(appContext);
    const history = useHistory();

    const [contents, setContents] = useState<Content[]>([]);
    const [currentContent, setCurrentContent] = useState<number|null>(null);
    const [isShowEndTip, setShowEndTip] = useState(false);
    const [isShowJumpTip, setShowJumpTip] = useState(false);
    const [isHistoryOpen, setHistoryOpen] = useState(false);
    const [isSekaiSettingsOpen, setSekaiSettingsOpen] = useState(false);
    const [isChatWindowOpen, setChatWindowOpen] = useState(true);

    const currentMdContentText = useMemo(() => {
        if (currentContent === null) return '';
        if (currentContent < 0 || currentContent > contents.length - 1) return '';
        if (contents[currentContent].content === null) return '';
        let contentIndex = currentContent;
        while (contents[contentIndex].content === NOT_CHANGE_CONTENT_FLAG && contentIndex - 1 > 0) {
            contentIndex--;
        }
        return contents[contentIndex].content ?? '';
    }, [currentContent, contents]);

    const currentChatContentText = useMemo(() => {
        if (currentContent === null) return '';
        if (currentContent < 0 || currentContent > contents.length - 1) return '';
        return contents[currentContent].chat;
    }, [currentContent, contents]);

    const isShowMD = useMemo(() => {
        if (currentContent === null) return false;
        if (currentContent < 0 || currentContent > contents.length - 1) return false;
        return contents[currentContent].content !== null;
    }, [currentContent, contents]);

    const requestContents = useCallback(async (articleId: number) => {
        setContents([
            {
                chat: '这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章',
                content: null
            },
            {
                chat: '不管怎么样，都还是好好写一下吧',
                content: null
            },
            {
                chat: '下一个测试下显示md',
                content: null
            },
            {
                chat: '这是一段md的内容',
                content: '# 一篇测试文章\n> 青空天下第一'
            },
            {
                chat: '这里接着显示上一段的内容',
                content: NOT_CHANGE_CONTENT_FLAG
            },
            {
                chat: '最后结束了',
                content: null
            }
        ]);
        setCurrentContent(0);
    }, []);

    const nextContent = useCallback(() => {
        if (currentContent === null) return;
        if (currentContent >= contents.length - 1) {
            if (!isShowEndTip) setShowEndTip(true);
            return;
        }
        setCurrentContent(currentContent + 1);
    }, [contents, currentContent, isShowEndTip]);

    const handleEndTipMenuYesClick = useCallback(async () => {
        setShowEndTip(false);
        history.replace('/main');
    }, []);

    const handleEndTipMenuNoClick = useCallback((event) => {
        event.stopPropagation();
        setShowEndTip(false);
    }, []);

    const handleJumpTipMenuYesClick = useCallback(() => {
        setCurrentContent(jumpIndex);
        setShowJumpTip(false);
        setHistoryOpen(false);
    }, []);

    const handleJumpTipMenuNoClick = useCallback((event) => {
        event.stopPropagation();
        setShowJumpTip(false);
    }, []);

    const handleRootWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY < 0 && !isHistoryOpen && !isShowEndTip) {
            setHistoryOpen(true);
        }
    }, [isHistoryOpen, isShowEndTip]);

    const handleHistoryItemClick = (item: HistoryContent, index: number) => {
        // noinspection JSIgnoredPromiseFromCall
        ctx.playBgm('sekai_card_box_click', true);
        if (index === currentContent) return;
        setShowJumpTip(true);
        jumpIndex = index;
    };

    const handleHistoryContextMenu = () => {
        setHistoryOpen(false);
    };

    const handleSekaiSettingsContextMenu = () => {
        setSekaiSettingsOpen(false);
        setChatWindowOpen(true);
    };

    const handleSekaiSettingsLoadEnd = () => {
        setSekaiSettingsOpen(false);
    };

    const handleSekaiSettingsReturnClick = () => {
        setSekaiSettingsOpen(false);
        setChatWindowOpen(true);
    }

    const handleRootContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (isShowEndTip) {
            setShowEndTip(false);
            return;
        }
        if (isShowJumpTip) {
            setShowJumpTip(false);
            return;
        }
        setSekaiSettingsOpen(true);
        setChatWindowOpen(false);
    }, [isShowEndTip, isShowJumpTip]);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        requestContents(parseInt(routeMatch.params.articleId));
    }, [routeMatch.params.articleId, requestContents]);

    return (
        <>
            <div style={{
                position: "relative",
                overflow: "hidden",
                width: '100vw',
                height: '100vh'
            }} onClick={nextContent}
                onWheel={handleRootWheel}
                onContextMenu={handleRootContextMenu}>
                <div style={{
                    transition: 'filter 0.3s, transform 0.3s',
                    width: '100%',
                    height: '100%',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    position: "absolute",
                    backgroundImage: `url('${ArticleBg}')`,
                    ...(isShowMD ? {
                        filter: 'blur(2px)',
                        transform: 'scale(1.2)'
                    } : {})
                }}>
                </div>
                <div style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundImage: `url(${Shinku1})`,
                    backgroundPosition: "bottom",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    transform: 'translateY(25%) translateX(-4%)',
                    transition: 'opacity 0.6s',
                    opacity: `${isShowMD ? 0 : 1}`
                }}/>
                <div className={classes.markdownRootContainer} style={{
                    position: "absolute",
                    top: '10%',
                    left: '25%',
                    right: '25%',
                    bottom: '18vw',
                    backgroundColor: 'white',
                    transition: 'opacity 0.6s',
                    opacity: `${isShowMD ? 1 : 0}`
                }} onClick={isShowMD ? (e) => {e.stopPropagation()} : undefined}>
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${ArticleBook})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        opacity: 0.4,
                        zIndex: 9
                    }}/>
                    <div style={{
                        position: "absolute",
                        top: '4vh',
                        left: '2vw',
                        right: '2vw',
                        bottom: '4vh',
                        zIndex: 10,
                        overflowY: "auto"
                    }}>
                        <ReactMarkdown
                            remarkPlugins={[gfm]} children={currentMdContentText}/>
                    </div>
                </div>
                <MainWindow
                    characterImg={isShowMD ? ChatAvatarShinkuBg : undefined} name={'真红'}
                    text={`「${currentChatContentText || '......'}」`}
                    open={isChatWindowOpen}/>
                <WindowTipMenu
                    tipText={'返回到主界面？'}
                    show={isShowEndTip}
                    onYesClick={handleEndTipMenuYesClick}
                    onNoClick={handleEndTipMenuNoClick}
                />
                <WindowTipMenu
                    tipText={'跳转到这里吗？'}
                    show={isShowJumpTip}
                    onYesClick={handleJumpTipMenuYesClick}
                    onNoClick={handleJumpTipMenuNoClick}
                />
            </div>
            <ArticleContentsHistory
                open={isHistoryOpen}
                onItemClick={handleHistoryItemClick}
                onContextMenu={handleHistoryContextMenu}
                historyContents={contents.slice(0, (currentContent ?? 0) + 1).map((content) => ({
                    chat: `「${content.chat}」`,
                    content: content.content
                }))}/>
            <SekaiSettings
                open={isSekaiSettingsOpen}
                onContextMenu={handleSekaiSettingsContextMenu}
                onLoadEnd={handleSekaiSettingsLoadEnd}
                onReturnClick={handleSekaiSettingsReturnClick}/>
        </>
    );
};

export default ArticleContent;