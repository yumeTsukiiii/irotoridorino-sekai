import React, {CSSProperties} from 'react';
import './feather_background.css';
import TitleBg1C from '../../assets/img/title_bg1_C.png';
import TitleBg1D from '../../assets/img/title_bg1_D.png';

const FeatherBackground: React.FC = () => {

    const bg = {
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
    };

    const styles = {
        bgContainer: {
            height: '100%',
            width: '100%',
            position: "relative"
        } as CSSProperties,
        bgC: {
            position: "absolute",
            height: '100%',
            width: '100%',
            backgroundImage: `url('${TitleBg1C}')`,
            ...bg,
            backgroundRepeat: "repeat-y",
            backgroundSize: "contain"
        } as CSSProperties,
        bgD: {
            position: "absolute",
            height: '100%',
            width: '100%',
            backgroundImage: `url('${TitleBg1D}')`,
            ...bg,
            backgroundRepeat: "repeat-y",
            backgroundSize: "contain"
        } as CSSProperties
    };
    return (
        <div style={styles.bgContainer}>
            <div className={'bg-C-transform'} style={styles.bgC}/>
            <div className={'bg-D-transform'} style={styles.bgD}/>
        </div>
    );
};

export default FeatherBackground;
