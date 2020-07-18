import React from "react";
import LoadingImage from '../../assets/img/loading.jpg';
import './loading_bg.css';

type LoadingBgProps = {
    show: boolean
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    loadingText: 'Loading' as string,
    subLoadingText: '' as string
}

const LoadingBg: React.FC<LoadingBgProps> = (props) => {
    return (
        <>
            {
                props.show && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'black',
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img
                            style={{
                                borderRadius: '50%'
                            }}
                            className={'shinku-avatar'}
                            alt={'loading'} src={LoadingImage}/>
                        <div style={{width: '100%', height: '32px'}}/>
                        <p style={{
                            color: 'white',
                            fontSize: '2.5em',
                            fontFamily: 'Cursive, serif',
                            textShadow: `1px 1px .1em #f7dd81, -1px -1px .1em #f7dd81, 1px -1px .1em #f7dd81, -1px 1px .1em #f7dd81`
                        }}>{props.loadingText}</p>
                        <div style={{width: '100%', height: '16px'}}/>
                        <p style={{
                            color: 'white',
                            fontSize: '2em',
                            fontFamily: 'Cursive, serif',
                            textShadow: `1px 1px .1em #f7dd81, -1px -1px .1em #f7dd81, 1px -1px .1em #f7dd81, -1px 1px .1em #f7dd81`
                        }}>{props.subLoadingText}</p>
                    </div>
                )
            }
        </>
    );
};

export default LoadingBg;
