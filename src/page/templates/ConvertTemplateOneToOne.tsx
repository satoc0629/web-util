import React, {PropsWithChildren} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useLocation} from "react-router-dom";
import {cards} from "../../const/Cards";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {RightAndLeftTextArea} from "../organisms/RightAndLeftTextArea";
import {Body2} from "../atoms/Body2";
import {Overview} from "../modlecules/Overview";

const useStyle = makeStyles(createMuiTheme => ({
    transferArea: {
        display: "grid",
        margin: createMuiTheme.spacing(1),
        justifyContent: "center",
        gridTemplateColumns: "5fr 2fr 5fr"
    }
}))

export type StringConverter = (input: string) => string

interface Props {
    description: string
    leftTitle: string
    rightTitle: string
    leftPlaceholder: string
    rightPlaceholder: string
    onLeftToRight: StringConverter
    onRightToLeft: StringConverter
    onLeftToLeft?: StringConverter
    onRightToRight?: StringConverter
    classes?: ClassNameMap<"transferArea" | "arrowArea" | "arrow" | "inputArea">
}

export const ConvertTemplateOneToOne = (props: PropsWithChildren<Props>) => {
    let classes = useStyle()

    const location = useLocation()
    const title = cards.filter(e => e.link === location.pathname)[0].title

    return <>
        <Overview title={title} description={props.description}/>
        <div className={classes.transferArea}>
            <Body2 body2={props.leftTitle}/>
            <div/>
            <Body2 body2={props.rightTitle}/>
            <RightAndLeftTextArea {...props}/>
        </div>
    </>
}