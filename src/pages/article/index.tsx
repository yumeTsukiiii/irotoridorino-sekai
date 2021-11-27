// noinspection ES6MissingAwait

import React, {CSSProperties, useCallback, useContext, useEffect, useState} from "react";
import LoadDataBackgroundImg from '../../assets/img/load_data_background.png'
import SekaiCardBox from "../../components/sekai_card_box";
import SekaiCardButton from "../../components/sekai_card_button";
import SekaiCardData from "../../components/sekai_card_data";
import SekaiPagination from "../../components/sekai_pagination";
import {appContext} from "../../context/AppContextWrapper";
import {useHistory} from "react-router";
import classes from './index.module.css';
import FadeDialog from "../../components/fade_dialog";

interface ArticleData {
    id: number
    title: string
    createTime: number
    updateTime: number
    description: string
    link: string
    imgSrc: string|null
}

const BorderContainer: React.FC<{style?: CSSProperties}> = (props) => {
    return (
        <div style={{
            margin: '6px 6px',
            border: '1px solid white',
            ...props.style
        }}>{props.children}</div>
    );
};

type ArticleProps = {
    open: boolean,
    onExitClick?: () => any,
    onItemClick?: () => any,
    onContextMenuClick?: () => any
} & Partial<Readonly<typeof defaultProps>>;

const defaultProps = {
    zIndex: 999 as number
}

const Article: React.FC<ArticleProps> = (props) => {

    const ctx = useContext(appContext);
    const history = useHistory();

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 12;
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const [currentArticleIndex, setCurrentArticleIndex] = useState<number|null>(null);
    const [isOpened, setOpened] = useState(false);

    const handleCurrentPageChange = useCallback(async (value) => {
        setCurrentPage(value);
        await ctx.playBgm('sekai_card_box_click', true);
    }, [ctx]);

    const handleDataItemClick = useCallback(async (itemIndex: number) => {
        if (currentArticleIndex === null) {
            ctx.playBgm('sekai_card_box_no_data_click', true);
            return;
        }
        ctx.playBgm('sekai_card_box_click', true);
        history.replace(`/article/${articles[currentArticleIndex].id}`);
        props.onItemClick?.();
    }, [ctx, currentArticleIndex, articles, history]);

    const handleContextMenuClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        props.onContextMenuClick?.();
    }, [props.onContextMenuClick]);

    const handleDataItemHover = useCallback((itemIndex: number) => {
        if (itemIndex >= articles.length) {
            setCurrentArticleIndex(null);
            return;
        }
        setCurrentArticleIndex(itemIndex);
    }, [articles]);

    const handleDataItemBlur = useCallback(() => {
        setCurrentArticleIndex(null);
    }, []);

    const handleExitBtnClick = useCallback(async () => {
        props.onExitClick?.();
        await ctx.playBgm('sekai_card_box_click', true);
    }, [ctx, props.onExitClick]);

    const requestArticles = useCallback(async () => {
        setArticles(Array(4).fill(0).map((_, index) => (
            {
                id: index,
                title: `测试文章_${index + 1}`,
                createTime: new Date().getTime(),
                updateTime: new Date().getTime(),
                description: '这只是一个测试文章emm',
                link: 'https://...',
                imgSrc: null
            }
        )));
    }, []);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        requestArticles();
    }, [requestArticles, currentPage]);

    useEffect(() => {
        if (props.open) {
            if (!isOpened) {
                setOpened(true);
            }
        }
    }, [props.open, isOpened]);

    return (
        <FadeDialog style={{
            backgroundImage: `url(${LoadDataBackgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            flexDirection: "column",
            alignItems: "center",
        }}
        open={props.open}
        zIndex={props.zIndex}
        onContextMenu={props.onContextMenuClick && handleContextMenuClick}>
            <div style={{
                height: '10vh',
                margin: '0 3vw',
                display: "flex",
                alignItems: "center"
            }}>
                <span style={{
                    letterSpacing: 4,
                    fontSize: '2.5vw',
                    color: "white",
                    transform: 'scaleX(1.1)',
                    whiteSpace: "nowrap",
                    textShadow: '0px 0px 8px white, 0px 0px 8px white, 0px 0px 8px white, 0px 0px 8px white'
                }}>-LOAD-</span>
                <div style={{
                    flexGrow: 3,
                    margin: '0 1vw',
                    textAlign: "center",
                    overflow: "hidden"
                }}>
                    <SekaiPagination
                        currentPage={currentPage}
                        onChange={handleCurrentPageChange}/>
                </div>
                <SekaiCardButton
                    width={82}
                    textStyle={{fontSize: 12}}
                >OPTION</SekaiCardButton>
                <div style={{flexGrow: 1}}/>
                <SekaiCardButton
                    width={82}
                    style={{
                        marginLeft: 16
                    }}
                    textStyle={{fontSize: 12}}
                >LOAD</SekaiCardButton>
                <SekaiCardButton
                    width={82}
                    style={{
                        marginLeft: 32
                    }}
                    textStyle={{fontSize: 12}}
                    onClick={handleExitBtnClick}
                >EXIT</SekaiCardButton>
            </div>
            <SekaiCardBox
                style={{
                    margin: '0 1vw'
                }}
                height={'86vh'}
                canHover={false}
                containerStyle={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                {/** 数据框 */}
                <BorderContainer style={{
                    flexGrow: 1,
                    border: 'none',
                    marginBottom: '1px',
                    display: "flex",
                }}>
                    {/** 数据Grid */}
                    <BorderContainer style={{
                        margin: '0 0',
                        flexGrow: 1,
                        display: "flex",
                        flexWrap: "wrap"
                    }}>
                        {
                            [
                                ...articles,
                                ...articles.length === pageSize ? [] : Array(
                                    pageSize - articles.length
                                ).fill(0).map<Partial<ArticleData>>(() => ({}))
                            ].map((data, index) => (
                                <SekaiCardData
                                    key={`article-${data.id ?? `index-${index}`}`}
                                    dataIndex={index + 1}
                                    width={'23.75%'}
                                    style={{
                                        marginLeft: '1%',
                                        marginTop: '1%',
                                        marginBottom: '1%'
                                    }}
                                    onClick={() => handleDataItemClick(index)}
                                    src={data.imgSrc ?? undefined}
                                    date={data.createTime ? new Date(data.createTime) : undefined}
                                    onHover={() => handleDataItemHover(index)}
                                    onBlur={handleDataItemBlur}/>
                            ))
                        }
                    </BorderContainer>
                    {/** 按钮/最近访问 */}
                    <BorderContainer style={{
                        border: "none",
                        marginRight: 0,
                        marginBottom: 0,
                        marginTop: 0,
                        width: '20vw',
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {/** 按钮 */}
                        <BorderContainer style={{
                            border: "none",
                            height: '19vh',
                            marginLeft: 16,
                            marginRight: 16,
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <SekaiCardButton>DATA DELETE</SekaiCardButton>
                            <div style={{height: '1.5vh'}}/>
                            <SekaiCardButton>DATA MOVE</SekaiCardButton>
                            <div style={{height: '1.5vh'}}/>
                            <SekaiCardButton>DATA COPY</SekaiCardButton>
                        </BorderContainer>
                        {/** 最近访问 */}
                        <BorderContainer style={{
                            flexGrow: 1,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            color: "white",
                            padding: 16,
                            paddingTop: 8,
                            fontSize: '1.2vw'
                        }}>
                            <span style={{margin: 8, fontWeight: 600}}>从上回继续</span>
                            <SekaiCardData style={{flexGrow: 1}}/>
                            <span style={{margin: 8, fontWeight: 600}}>快速载入</span>
                            <SekaiCardData style={{flexGrow: 1}}/>
                        </BorderContainer>
                    </BorderContainer>
                </BorderContainer>

                {/** 对话框 */}
                <BorderContainer style={{
                    height: '10vh',
                    padding: '16px 24px',
                    fontSize: '1.5vw',
                    color: "white",
                    letterSpacing: 2
                }}>
                    {currentArticleIndex !== null ? articles[currentArticleIndex].title : null}
                </BorderContainer>
            </SekaiCardBox>
        </FadeDialog>
    )
};

Article.defaultProps = defaultProps;

export default Article;
