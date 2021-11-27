import React, {useEffect, useRef, useState} from "react";
import SekaiCardBox from "../../components/sekai_card_box";
import HistoryAvatarShinkuBg from '../../assets/img/history_avatar_shinku.png';
import FCPlay from '../../assets/img/fc_play_1.png';
import FCPlayHover from '../../assets/img/fc_play_2.png';
import classes from './index.module.css';
import FadeDialog from "../../components/fade_dialog";

export type HistoryContent = {
    chat: string,
    content: string|null
}

type ContentItemProps = {
    avatar: string,
    content: HistoryContent,
    index: number,
    onItemClick?: (content: HistoryContent, index: number) => any
}

const ContentItem: React.FC<ContentItemProps> = (props) => {

    const avatarWhiteBgRef = useRef<HTMLDivElement>(null);
    const fcPlayRef = useRef<HTMLImageElement>(null);
    const contentContainerRef = useRef<HTMLImageElement>(null);

    const handleItemHover = () => {
        if (!avatarWhiteBgRef.current || !fcPlayRef.current || !contentContainerRef.current) return;
        avatarWhiteBgRef.current.style.opacity = '0.4';
        fcPlayRef.current.style.display = 'inline';
        contentContainerRef.current.style.backgroundColor = 'rgba(0,0,0,0.5)';
    };

    const handleItemBlur = () => {
        if (!avatarWhiteBgRef.current || !fcPlayRef.current || !contentContainerRef.current) return;
        avatarWhiteBgRef.current.style.opacity = '0';
        fcPlayRef.current.style.display = 'none';
        contentContainerRef.current.style.backgroundColor = 'transparent';
    }

    return (
        <div
            onClick={props.onItemClick && (() => props.onItemClick!!(props.content, props.index))}
            onMouseOver={handleItemHover}
            onMouseOut={handleItemBlur}
            style={{
                height: '19vh',
                margin: '0.5vh 1vw',
                display: "flex",
                flexShrink: 0
            }}>
            <div style={{
                width: '19vh',
                margin: '4px 0',
                position: "relative",
                flexShrink: 0
            }}>
                <SekaiCardBox
                    canHover={false}
                    width={'100%'}
                    height={'100%'}
                    lrLineTb={0}
                    lrLineWidth={4}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${props.avatar})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}/>
                </SekaiCardBox>
                <div ref={avatarWhiteBgRef} style={{
                    width: '100%', height: '100%', backgroundColor: "white",
                    opacity: 0, position: "absolute", top: 0
                }}/>
            </div>
            <div ref={contentContainerRef} style={{
                height: '100%',
                display: "flex", marginLeft: '0.6vw',
                borderRadius: '12px',
                flexGrow: 1
            }}>
                <div style={{
                    position: 'relative',
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: '6%',
                    height: '100%',
                    marginLeft: 12,
                    flexShrink: 0
                }}>
                    <img ref={fcPlayRef} style={{
                        position: "absolute",
                        display: "none"
                    }} src={FCPlay} alt={'fc_play'}/>
                    <img style={{
                        position: "absolute"
                    }} src={FCPlayHover} alt={'fc_play'}/>
                </div>
                <p style={{
                    flexGrow: 1,
                    marginTop: '2vh',
                    color: "white", fontSize: 20, fontWeight: 500,
                    textShadow: '2px 2px .1em rgba(0,0,0,0.5), 0 -1px .1em rgba(0,0,0,0.5), -1px 0 .1em rgba(0,0,0,0.5)',
                    letterSpacing: 4,
                    lineHeight: 1.5
                }}>
                    {props.content.chat}
                </p>
            </div>
        </div>
    );
};

type ArticleContentsHistoryProps = {
    open: boolean,
    onItemClick?: (content: HistoryContent, index: number) => any,
    onContextMenu?: () => any
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    historyContents: [] as HistoryContent[],
    zIndex: 999 as number
}

const ArticleContentsHistory: React.FC<ArticleContentsHistoryProps> = (props) => {

    const scrollDivRef = useRef<HTMLDivElement>(null);

    const handleRightContextMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        props.onContextMenu!!.call(null);
    }

    useEffect(() => {
        if (!scrollDivRef.current) return;
        if (props.open) {
            scrollDivRef.current.scrollTo({
                top: scrollDivRef.current.scrollHeight
            });
        }
    }, [props.open]);

    return (
        <FadeDialog
            onContextMenu={props.onContextMenu ? handleRightContextMenuClick : undefined}
            style={{
                backgroundColor: 'rgba(97, 144, 158, 0.4)'
            }} open={props.open} zIndex={props.zIndex}>
            <div ref={scrollDivRef} style={{
                height: '100%',
                display: "flex",
                flexDirection: "column",
                overflowY: "auto"
            }}>
                {props.historyContents!!.map((content, index) => (
                    <ContentItem
                        key={`content_item_${index}`}
                        avatar={HistoryAvatarShinkuBg}
                        onItemClick={props.onItemClick}
                        content={content}
                        index={index}
                    />
                ))}
            </div>
        </FadeDialog>
    )
};

ArticleContentsHistory.defaultProps = defaultProps;

export default ArticleContentsHistory;