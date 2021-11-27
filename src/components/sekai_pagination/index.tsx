import React, {CSSProperties, useCallback} from "react";
import SekaiCardButton from "../sekai_card_button";

type SekaiPaginationProps = {
    width?: string|number,
    onChange?: (currentPage: number) => any,
    style?: CSSProperties,
    buttonStyle?: CSSProperties,
    onHover?: () => any,
    onBlur?: () => any,
} & Partial<Readonly<typeof defaultProps>>

const defaultProps = {
    currentPage: 0 as number,
    itemHeight: 24 as string|number,
    pageSize: 20 as number,
    itemWidth: 24 as number
}

const SekaiPagination: React.FC<SekaiPaginationProps> = (props) => {

    const handleBtnClick = useCallback((btnIndex) => {
        if (btnIndex === props.currentPage) return;
        props.onChange?.call(null, btnIndex);
    }, [props.currentPage, props.onChange]);

    return (
        <div style={{
            display: "inline-flex",
            alignItems: "center",
            width: props.width,
            ...props.style
        }}>
            {
                Array(props.pageSize).fill(0).map((_, index) => {
                    return (
                        <SekaiCardButton
                            key={`sekai_page_button_${index}`}
                            hover={index === props.currentPage ? true : undefined}
                            height={props.itemHeight}
                            width={props.width ? '100%' : props.itemWidth}
                            lrLineWidth={1}
                            tbLineHeight={1}
                            textStyle={{
                                fontSize: 12
                            }}
                            style={{
                                marginLeft: index === 0 ? 0 : 1,
                                ...props.buttonStyle
                            }}
                            onHover={props.onHover}
                            onBlur={props.onBlur}
                            onClick={() => handleBtnClick(index)}>
                            {(index + 1).toString().padStart(2, '0')}
                        </SekaiCardButton>
                    )
                })
            }
        </div>
    );
};

SekaiPagination.defaultProps = defaultProps;

export default SekaiPagination;