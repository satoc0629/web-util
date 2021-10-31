import {Button, TextareaAutosize} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, {PropsWithChildren, useReducer} from "react";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {StringConverter} from "../templates/ConvertTemplateOneToOne";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(createMuiTheme => ({
    arrowArea: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    arrow: {},
    inputArea: {
        width: "30vw"
    }
}))

type changeType = 'left' | 'right' | 'clear'

interface ChangeAction {
    type: changeType
    value?: string
}

interface ChangeContainer {
    left?: string
    right?: string
}

interface Props {
    leftPlaceholder: string
    rightPlaceholder: string
    onLeftToRight: StringConverter
    onRightToLeft: StringConverter
    onLeftToLeft?: StringConverter
    onRightToRight?: StringConverter
    classes?: ClassNameMap<"arrowArea" | "arrow" | "inputArea">
}

export const RightAndLeftTextArea = (props: PropsWithChildren<Props>) => {
    let classes = useStyle()
    if (props.classes) {
        classes = props.classes
    }

    const [state, dispatch] = useReducer((state: ChangeContainer, action: ChangeAction) => {
        try {
            switch (action.type) {
                case "left":
                    if (action.value) {
                        state.right = props.onLeftToRight(action.value)
                        state.left = props.onLeftToLeft ? props.onLeftToLeft(action.value) : action.value
                    } else {
                        state.right = ""
                        state.left = ""
                    }
                    break
                case "right":
                    if (action.value) {
                        state.right = props.onRightToRight ? props.onRightToRight(action.value) : action.value
                        state.left = props.onRightToLeft(action.value)
                    } else {
                        state.right = ""
                        state.left = ""
                    }
                    break
                case "clear":
                    state.right = ""
                    state.left = ""
                    break
                default:
                    throw new Error()
            }
        } catch (e) {
            console.error(e)
        }
        return {...state}
    }, {left: "", right: ""})

    return <>
        <TextareaAutosize
            placeholder={props.leftPlaceholder}
            rowsMin={10} className={classes.inputArea}
            onChange={e => dispatch({type: "left", value: e.target.value})}
            value={state.left}
        />
        <div className={classes.arrowArea}>
            <ArrowForwardIcon className={classes.arrow}/>
            <ArrowBackIcon className={classes.arrow}/>
            <Button onClick={() => dispatch({type: "clear"})} variant={"outlined"}>Clear</Button>
        </div>
        <TextareaAutosize placeholder={props.rightPlaceholder} rowsMin={10}
                          className={classes.inputArea}
                          onChange={e => dispatch({type: "right", value: e.target.value})}
                          value={state.right}
        />
    </>
}