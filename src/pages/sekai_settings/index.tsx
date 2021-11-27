import React, {useState} from "react";
import SysWindowLeft from '../../assets/img/sys_window_left.png';
import SysWindowRight from '../../assets/img/sys_window_right.png';
import SekaiSettingsButton from "../../components/sekai_settings_button";
import {useHistory} from "react-router";
import Article from "../article";
import FadeDialog from "../../components/fade_dialog";

type SekaiSettingsProps = {
    open: boolean,
    onContextMenu?: () => any,
    onReturnClick?: () => any,
    onExitClick?: () => any
    onTitleClick?: () => any,
    onLoadClick?: () => any,
    onLoadEnd?: () => any,
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    zIndex: 998 as number
}

const SekaiSettings: React.FC<SekaiSettingsProps> = (props) => {

    const history = useHistory();
    const [isArticlePageOpen, setArticlePageOpen] = useState(false);

    const handleOnRootClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const handleOnRootContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        props.onContextMenu?.();
    };

    const handleReturnBtnClick = () => {
        props.onReturnClick?.();
    };

    const handleExitBtnClick = () => {
        history.replace('/');
    };

    const handleTitleBtnClick = () => {
        history.replace('/main');
    };

    const handleLoadBtnClick = () => {
        setArticlePageOpen(true);
    };

    const handleArticlePageExitBtnClick = () => {
        setArticlePageOpen(false);
    }

    const handleArticlePageItemClick = () => {
        setArticlePageOpen(false);
        props.onLoadEnd?.();
    };

    return (
        <>
            <FadeDialog style={{
                backgroundColor: 'rgba(97, 144, 158, 0.4)',
            }} onClick={handleOnRootClick}
                 onContextMenu={handleOnRootContextMenu}
                open={props.open}
                zIndex={props.zIndex}>
                <img src={SysWindowLeft} alt={'sys_window_left'} style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: '45%'
                }}/>
                <img src={SysWindowRight} alt={'sys_window_right'} style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: '45%'
                }}/>
                <SekaiSettingsButton style={{
                    position: 'absolute',
                    right: '45vw',
                    bottom: '2.5vw'
                }} subText={'返回到前一页'} onClick={props.onReturnClick || handleReturnBtnClick}>
                    RETURN
                </SekaiSettingsButton>

                <SekaiSettingsButton style={{
                    position: 'absolute',
                    right: '40.3vw',
                    bottom: '22vw'
                }} subText={'退出博客'} onClick={props.onExitClick || handleExitBtnClick}>
                    EXIT
                </SekaiSettingsButton>

                <SekaiSettingsButton style={{
                    position: 'absolute',
                    right: '23vw',
                    bottom: '39.2vw'
                }} subText={'回到标题'} onClick={props.onTitleClick || handleTitleBtnClick}>
                    TITLE
                </SekaiSettingsButton>

                <SekaiSettingsButton style={{
                    position: 'absolute',
                    right: '1vw',
                    bottom: '44.5vw'
                }} subText={'选择文章'} onClick={props.onLoadClick || handleLoadBtnClick}>
                    LOAD
                </SekaiSettingsButton>
            </FadeDialog>
            <Article
                open={isArticlePageOpen}
                onExitClick={handleArticlePageExitBtnClick}
                onItemClick={handleArticlePageItemClick}/>
        </>
    )
};

SekaiSettings.defaultProps = defaultProps;

export default SekaiSettings;