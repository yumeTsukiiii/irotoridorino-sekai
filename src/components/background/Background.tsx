import React, {CSSProperties} from 'react';

type BackgroundProps = {
    src: string
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    style: {} as CSSProperties,
    height: '100vh' as string,
    width: '100vw' as string
};

const Background: React.FC<BackgroundProps> = (props) => {
    const styles = {
        root: {
            width: props.width,
            height: props.height,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            position: "absolute",
            backgroundImage: `url('${props.src}')`,
            top: 0
        } as CSSProperties
    };

    return (
        <div style={{...styles.root, ...props.style}}>
            {props.children}
        </div>
    )
};

Background.defaultProps = defaultProps;

export default Background;
