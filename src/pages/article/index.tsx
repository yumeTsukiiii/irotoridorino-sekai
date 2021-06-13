import React, {CSSProperties, useCallback, useContext, useState} from "react";
import LoadDataBackgroundImg from '../../assets/img/load_data_background.png'
import SekaiCardBox from "../../components/sekai_card_box";
import SekaiCardButton from "../../components/sekai_card_button";
import SekaiCardData from "../../components/sekai_card_data";
import SekaiPagination from "../../components/sekai_pagination";
import {appContext} from "../../context/AppContextWrapper";

const BorderContainer: React.FC<{style?: CSSProperties}> = (props) => {
    return (
        <div style={{
            margin: '6px 6px',
            border: '1px solid white',
            ...props.style
        }}>{props.children}</div>
    );
};

const Article: React.FC = () => {

    const ctx = useContext(appContext);

    const [currentPage, setCurrentPage] = useState(0);

    const handleCurrentPageChange = useCallback((value) => {
        setCurrentPage(value);
        ctx.playBgm('sekai_card_box_click', true);
    }, [ctx]);

    const handleDataItemClick = useCallback(() => {
        ctx.playBgm('sekai_card_box_no_data_click', true);
    }, [ctx]);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${LoadDataBackgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <div style={{
                height: '10vh',
                width: '96vw',
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
                >EXIT</SekaiCardButton>
            </div>
            <SekaiCardBox
                width={'99vw'}
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
                            Array(12).fill(0).map((_, index) => (
                                <SekaiCardData
                                    dataIndex={index + 1}
                                    width={'23.75%'}
                                    style={{
                                        marginLeft: '1%',
                                        marginTop: '1%',
                                        marginBottom: '1%'
                                    }}
                                    onClick={handleDataItemClick}/>
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
                    「你没事吧」
                </BorderContainer>
            </SekaiCardBox>
        </div>
    )
};

export default Article;
