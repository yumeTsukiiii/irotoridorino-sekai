import React, {CSSProperties} from "react";
import LoadDataBackgroundImg from '../../assets/img/load_data_background.png'
import SekaiCardBox from "../../components/sekai_card_box";
import SekaiCardButton from "../../components/sekai_card_button";
import SekaiCardData from "../../components/sekai_card_data";

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
            <div style={{height: '10vh'}}>

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
                                    }}/>
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
                            height: '18vh',
                            marginLeft: 16,
                            marginRight: 16,
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}>
                            <SekaiCardButton>DATA DELETE</SekaiCardButton>
                            <SekaiCardButton>DATA MOVE</SekaiCardButton>
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
                            paddingTop: 8
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
                    fontSize: 20,
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
