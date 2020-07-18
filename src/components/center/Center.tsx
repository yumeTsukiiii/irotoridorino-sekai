import React, {CSSProperties} from 'react';

type CenterProps = {

} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    style: {} as CSSProperties
};

const Center : React.FC<CenterProps> = (props) => {

    const styles = {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        } as CSSProperties
    };

    return (
        <div style={{
            ...styles.root,
            ...props.style
        }}>
            {props.children}
        </div>
    )
};

export default Center;
