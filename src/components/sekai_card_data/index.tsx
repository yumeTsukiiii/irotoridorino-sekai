import React, {CSSProperties} from "react";
import SekaiCardBox from "../sekai_card_box";
import LoadDataBoxBackground from "../../assets/img/load_data_box_background.png"
import {simpleFormatDate, simpleFormatTime} from "../../utils/data_format";

type SekaiCardDataProps = {
    dataIndex?: number,
    date?: Date,
    src?: string,
    width?: string|number,
    height?: string|number,
    style?: CSSProperties,
    headerStyle?: CSSProperties,
    onHover?: () => any,
    onBlur?: () => any,
    onClick?: () => any,
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {

}

const SekaiCardData: React.FC<SekaiCardDataProps> = (props) => {
    return (
        <SekaiCardBox
            width={props.width}
            height={props.height}
            style={{
                ...props.style
            }}
            containerStyle={{
                display: "flex",
                flexDirection: "column"
            }}
            onHover={props.onHover}
            onBlur={props.onBlur}
            onClick={props.onClick}>
            <div style={{
                color: "white",
                display: "flex",
                justifyContent: props.dataIndex ? "space-between" : "flex-end",
                margin: 4,
                marginBottom: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: 14,
                fontWeight: 600,
                ...props.headerStyle
            }}>
                {props.dataIndex && <span>
                    {`${props.dataIndex}`.padStart(3, '0')}
                </span>}
                <span>
                    <span style={{
                        marginRight: 16
                    }}>{
                        props.date ? simpleFormatDate(props.date) :
                            '/  /        '.replace(/ /g, '\u00a0')
                    }</span>
                    {
                        props.date ? simpleFormatTime(props.date) :
                            ':     '.replace(/ /g, '\u00a0')
                    }
                </span>
            </div>
            <div style={{
                flexGrow: 1,
                backgroundImage: `url(${props.src ?? LoadDataBoxBackground})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                margin: 5
            }}/>
        </SekaiCardBox>
    )
};

SekaiCardData.defaultProps = defaultProps;

export default SekaiCardData;
