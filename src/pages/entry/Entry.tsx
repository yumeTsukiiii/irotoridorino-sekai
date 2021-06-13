import React, {CSSProperties, useContext, useState} from 'react';
import Shinku1 from '../../assets/img/shinku_1.png';
import './entry.css';
import MainWindow from "../../components/main_window/MainWindow";
import TipMenu from "../../components/tip_menu/TipMenu";
import {useHistory} from "react-router";
import {appContext} from "../../context/AppContextWrapper";

type EntryProps = {

};

const Entry: React.FC<EntryProps> = () => {

    const styles = {
        root: {
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#000'
        } as CSSProperties,
        tipMenu: {
            position: "absolute",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -70%)'
        } as CSSProperties
    };

    const history = useHistory();

    const steps = [
        {
            text: '「确认要进入五彩斑斓的世界吗？(这将加载一定图片和语音资源)」',
            onClick: () => {
                setShowTipMenu(true);
            }
        }
    ];

    const handleTipMenuYesClick = async () => {
        setShowTipMenu(false);
        ctx.preloadBgAssets().then(
            () => ctx.preloadGameAssets()
        ).then(
            () => ctx.preloadBgm()
        ).then(() => {
            ctx.showWhiteBg().then(() => {
                history.push('/main');
                ctx.hideLoadingAssets();
                ctx.hideWhiteBg();
            });
        });
    };

    const ctx = useContext(appContext);
    const [currentStep] = useState(0);
    const [showTipMenu, setShowTipMenu] = useState(false);

    return (
        <div style={styles.root} onClick={steps[currentStep].onClick}>
            <div style={{
                position: "absolute",
                top: '20%',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundImage: `url(${Shinku1})`,
                backgroundPosition: "bottom",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
            }}/>
            <MainWindow name={'真红'} text={steps[currentStep].text}/>
            <div style={styles.tipMenu}>
                <TipMenu
                    tipText={'确认进入吗？'}
                    show={showTipMenu}
                    onYesClick={handleTipMenuYesClick}
                    onNoClick={(event) => {
                        event.stopPropagation();
                        setShowTipMenu(false);
                    }}
                />
            </div>
        </div>
    );
};

export default Entry;
