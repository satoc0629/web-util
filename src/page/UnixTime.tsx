import {Overview} from "./modlecules/Overview";
import {useLocation} from "react-router-dom";
import {cards} from "../const/Cards";
import React, {useReducer} from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import {
    InputTextMemorizedCursor,
    InputTextMemorizedCursorProps,
} from "./templates/InputTextMemorizedCursor";

const useStyles = makeStyles((theme) => ({
    inputArea: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: "repeat(4, 1fr)",
        gridTemplateColumns: "20vw 1vw 20vw"
    },
    text: {
        width: "20vw"
    },
    noContent: {
        display: "contents"
    },
    divider: {
        margin: theme.spacing(2),
    }
}));

interface StateModel {
    unixTimeSeconds?: string
    unixTimeMillSeconds?: string
    unixTimeMicroSeconds?: string
    unixTimeNanoSeconds?: string
    dateOfUnixTimeSeconds?: string
    dateOfUnixTimeMillSeconds?: string
    dateOfUnixTimeMicroSeconds?: string
    dateOfUnixTimeNanoSeconds?: string
}

export type UnixTimeActionType =
    "unixTimeSeconds"
    | "unixTimeMillSeconds"
    | "unixTimeMicroSeconds"
    | "unixTimeNanoSeconds"
    | "dateOfUnixTimeSeconds"
    | "dateOfUnixTimeMillSeconds"
    | "dateOfUnixTimeMicroSeconds"
    | "dateOfUnixTimeNanoSeconds"
    | "clear"

interface UnixTimeAction {
    inputType: UnixTimeActionType
    value: string
    event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
}

type ReducerType = (state: StateModel, action: UnixTimeAction) => StateModel

interface ViewType {
    label: string
    helperText: string
    inputType: UnixTimeActionType
    state?: string,
    format?: string
}

const nanoSecondsFormat = "yyyy/MM/DD HH:mm:ss.SSSSSSSSS"
const microSecondsFormat = "yyyy/MM/DD HH:mm:ss.SSSSSS"
const millSecondsFormat = "yyyy/MM/DD HH:mm:ss.SSS"
const secondsFormat = "yyyy/MM/DD HH:mm:ss"

/**
 * 1. 文字列化したbigint をcommaPointで分割する。
 * 2.
 *
 * @param unixTimeString
 */
function splitUnixSeconds(unixTimeString: string) {
    const secondsEnd = unixTimeString.substr(10)
    const secondTime = unixTimeString.substr(0, 10)
    return {moment: moment.unix(Number(secondTime)), microSecond: secondsEnd}
}

type ConvertType = "seconds" | "millSeconds" | "microSeconds" | "nanoSeconds"

function unixFormat(unixTime: string, toType: ConvertType, fromType: ConvertType) {
    let to = 1n
    let from = 1n
    let padIndex = 10
    switch (toType) {
        case "seconds":
            padIndex = 10
            to = 0n
            break
        case "millSeconds":
            padIndex = 13
            to = 1n
            break
        case "microSeconds":
            padIndex = 16
            to = 2n
            break
        case "nanoSeconds":
            padIndex = 19
            to = 3n
            break
    }

    switch (fromType) {
        case "seconds":
            from = 0n
            break
        case "millSeconds":
            from = 1n
            break
        case "microSeconds":
            from = 2n
            break
        case "nanoSeconds":
            from = 3n
            break
    }

    let bigint
    let fromTo = from - to
    if (fromTo === 0n) {
        bigint = BigInt(unixTime)
    } else if (fromTo < 0) {
        bigint = BigInt(unixTime) * (1000n ** BigInt(Math.abs(Number(fromTo))))
    } else {
        bigint = BigInt(unixTime) / (1000n ** BigInt(Math.abs(Number(fromTo))))
    }

    return bigint.toString()
        .padStart(padIndex, "0").slice(-padIndex)
}

export const UnixTime = () => {
    const classes = useStyles()
    const location = useLocation()
    const card = cards.filter(e => e.link === location.pathname)[0]

    const [state, dispatch] = useReducer<ReducerType>((prevState, action) => {
        const newState = {} as StateModel
        let microObject, nanoObject

        switch (action.inputType) {
            case "unixTimeSeconds":
                newState.unixTimeSeconds = unixFormat(action.value, "seconds", "seconds")
                newState.unixTimeMillSeconds = unixFormat(action.value, "millSeconds", "seconds")
                newState.unixTimeMicroSeconds = unixFormat(action.value, "microSeconds", "seconds")
                newState.unixTimeNanoSeconds = unixFormat(action.value, "nanoSeconds", "seconds")
                newState.dateOfUnixTimeSeconds = moment.unix(Number(newState.unixTimeSeconds)).format(secondsFormat)
                newState.dateOfUnixTimeMillSeconds = moment.unix(Number(newState.unixTimeMillSeconds) / 1000).format(millSecondsFormat)
                microObject = splitUnixSeconds(newState.unixTimeMicroSeconds)
                nanoObject = splitUnixSeconds(newState.unixTimeNanoSeconds)
                newState.dateOfUnixTimeMicroSeconds = microObject.moment.format(millSecondsFormat) + microObject.microSecond
                newState.dateOfUnixTimeNanoSeconds = nanoObject.moment.format(millSecondsFormat) + nanoObject.microSecond
                break
            case "unixTimeMillSeconds":
                newState.unixTimeSeconds = unixFormat(action.value, "seconds", "millSeconds")
                newState.unixTimeMillSeconds = unixFormat(action.value, "millSeconds", "millSeconds")
                newState.unixTimeMicroSeconds = unixFormat(action.value, "microSeconds", "millSeconds")
                newState.unixTimeNanoSeconds = unixFormat(action.value, "nanoSeconds", "millSeconds")
                microObject = splitUnixSeconds(newState.unixTimeMicroSeconds)
                nanoObject = splitUnixSeconds(newState.unixTimeNanoSeconds)
                newState.dateOfUnixTimeSeconds = moment.unix(Number(newState.unixTimeSeconds)).format(secondsFormat)
                newState.dateOfUnixTimeMillSeconds = moment.unix(Number(newState.unixTimeMillSeconds) / 1000).format(millSecondsFormat)
                newState.dateOfUnixTimeMicroSeconds = microObject.moment.format(millSecondsFormat) + microObject.microSecond
                newState.dateOfUnixTimeNanoSeconds = nanoObject.moment.format(millSecondsFormat) + nanoObject.microSecond
                break
            case "unixTimeMicroSeconds":
                newState.unixTimeSeconds = unixFormat(action.value, "seconds", "microSeconds")
                newState.unixTimeMillSeconds = unixFormat(action.value, "millSeconds", "microSeconds")
                newState.unixTimeMicroSeconds = unixFormat(action.value, "microSeconds", "microSeconds")
                newState.unixTimeNanoSeconds = unixFormat(action.value, "nanoSeconds", "microSeconds")
                microObject = splitUnixSeconds(newState.unixTimeMicroSeconds)
                nanoObject = splitUnixSeconds(newState.unixTimeNanoSeconds)
                newState.dateOfUnixTimeSeconds = moment.unix(Number(newState.unixTimeSeconds)).format(secondsFormat)
                newState.dateOfUnixTimeMillSeconds = moment.unix(Number(newState.unixTimeMillSeconds) / 1000).format(millSecondsFormat)
                newState.dateOfUnixTimeMicroSeconds = microObject.moment.format(millSecondsFormat) + microObject.microSecond
                newState.dateOfUnixTimeNanoSeconds = nanoObject.moment.format(millSecondsFormat) + nanoObject.microSecond
                break
            case "unixTimeNanoSeconds":
                newState.unixTimeSeconds = unixFormat(action.value, "seconds", "nanoSeconds")
                newState.unixTimeMillSeconds = unixFormat(action.value, "millSeconds", "nanoSeconds")
                newState.unixTimeMicroSeconds = unixFormat(action.value, "microSeconds", "nanoSeconds")
                newState.unixTimeNanoSeconds = unixFormat(action.value, "nanoSeconds", "nanoSeconds")
                microObject = splitUnixSeconds(newState.unixTimeMicroSeconds)
                nanoObject = splitUnixSeconds(newState.unixTimeNanoSeconds)
                newState.dateOfUnixTimeSeconds = moment.unix(Number(newState.unixTimeSeconds)).format(secondsFormat)
                newState.dateOfUnixTimeMillSeconds = moment.unix(Number(newState.unixTimeMillSeconds) / 1000).format(millSecondsFormat)
                newState.dateOfUnixTimeMicroSeconds = microObject.moment.format(millSecondsFormat) + microObject.microSecond
                newState.dateOfUnixTimeNanoSeconds = nanoObject.moment.format(millSecondsFormat) + nanoObject.microSecond
                break
            case "clear":
                newState.dateOfUnixTimeSeconds = undefined
                newState.dateOfUnixTimeMillSeconds = undefined
                newState.dateOfUnixTimeMicroSeconds = undefined
                newState.dateOfUnixTimeNanoSeconds = undefined
                newState.unixTimeSeconds = undefined
                newState.unixTimeMillSeconds = undefined
                newState.unixTimeMicroSeconds = undefined
                newState.unixTimeNanoSeconds = undefined
                break
            case "dateOfUnixTimeSeconds":
                try {
                    moment(action.value)
                    newState.dateOfUnixTimeSeconds = action.value
                    newState.dateOfUnixTimeMillSeconds = moment(action.value).format(millSecondsFormat)
                    const millSecondAfter = action.value.substr(19 + 1)
                    const secondMoment = moment(action.value.substr(0, 19))
                    newState.dateOfUnixTimeMicroSeconds = secondMoment.format(secondsFormat).toString() + "." + millSecondAfter.padStart(6, "0").substring(0, 6)
                    newState.dateOfUnixTimeNanoSeconds = secondMoment.format(secondsFormat).toString() + "." + millSecondAfter.padStart(9, "0").substring(0, 9)

                    const nanoSeconds = moment(newState.dateOfUnixTimeSeconds).unix().toString() + millSecondAfter.padStart(9, "0").substring(0, 9).slice(-9)
                    newState.unixTimeSeconds = unixFormat(nanoSeconds, "seconds", "nanoSeconds")
                    newState.unixTimeMillSeconds = unixFormat(nanoSeconds, "millSeconds", "nanoSeconds")
                    newState.unixTimeMicroSeconds = unixFormat(nanoSeconds, "microSeconds", "nanoSeconds")
                    newState.unixTimeNanoSeconds = unixFormat(nanoSeconds, "nanoSeconds", "nanoSeconds")
                } catch (throwable) {
                    console.warn("cast error")
                    action.event?.preventDefault()
                }
                break
            default:
                newState.dateOfUnixTimeSeconds = moment(action.value).format(secondsFormat)
                newState.dateOfUnixTimeMillSeconds = action.inputType === "dateOfUnixTimeMillSeconds" ? action.value : moment(action.value).format(millSecondsFormat)
                // const millSecondDotStartIndex = 19 // action.value.indexOf(".")
                // console.log(`millSecondsIndex:${millSecondDotStartIndex}`)
                const millSecondAfter = action.value.substr(19 + 1)
                const secondMoment = moment(action.value.substr(0, 19))
                newState.dateOfUnixTimeMicroSeconds = action.inputType === "dateOfUnixTimeMicroSeconds" ? action.value : secondMoment.format(secondsFormat).toString() + "." + millSecondAfter.padStart(6, "0").substring(0, 6)
                newState.dateOfUnixTimeNanoSeconds = action.inputType === "dateOfUnixTimeNanoSeconds" ? action.value : secondMoment.format(secondsFormat).toString() + "." + millSecondAfter.padStart(9, "0").substring(0, 9)

                const dateOfUnixTimeSeconds = moment(newState.dateOfUnixTimeSeconds)
                if (!dateOfUnixTimeSeconds.isValid()) {
                    return newState
                }
                const nanoSeconds = dateOfUnixTimeSeconds.unix().toString() + millSecondAfter.padStart(9, "0").substring(0, 9).slice(-9)
                newState.unixTimeSeconds = unixFormat(nanoSeconds, "seconds", "nanoSeconds")
                newState.unixTimeMillSeconds = unixFormat(nanoSeconds, "millSeconds", "nanoSeconds")
                newState.unixTimeMicroSeconds = unixFormat(nanoSeconds, "microSeconds", "nanoSeconds")
                newState.unixTimeNanoSeconds = unixFormat(nanoSeconds, "nanoSeconds", "nanoSeconds")
                break
        }
        return newState
    }, {
        unixTimeSeconds: moment().unix().toString(),
        unixTimeMillSeconds: String(moment().unix() * 1000),
        unixTimeMicroSeconds: String(moment().unix() * 1000 * 1000),
        unixTimeNanoSeconds: String(moment().unix() * 1000 * 1000 * 1000),
        dateOfUnixTimeSeconds: moment.unix(moment().unix()).format(secondsFormat),
        dateOfUnixTimeMillSeconds: moment.unix(moment().unix()).format(millSecondsFormat),
        dateOfUnixTimeMicroSeconds: moment.unix(moment().unix()).format(microSecondsFormat),
        dateOfUnixTimeNanoSeconds: moment.unix(moment().unix()).format(nanoSecondsFormat)
    } as StateModel)

    const unixSecondViews: ViewType[] = [
        {
            label: "Unix Time Seconds",
            helperText: moment().unix().toString(),
            inputType: "unixTimeSeconds",
            state: state.unixTimeSeconds
        },
        {
            label: "Unix Time MillSeconds",
            helperText: String(moment().unix() * 1000),
            inputType: "unixTimeMillSeconds",
            state: state.unixTimeMillSeconds
        },
        {
            label: "Unix Time MicroSeconds",
            helperText: String(moment().unix() * 1000 * 1000),
            inputType: "unixTimeMicroSeconds",
            state: state.unixTimeMicroSeconds
        },
        {
            label: "Unix Time NanoSeconds",
            helperText: String(moment().unix() * 1000 * 1000 * 1000),
            inputType: "unixTimeNanoSeconds",
            state: state.unixTimeNanoSeconds
        }
    ]
    const momentViews: ViewType[] = [
        {
            label: "Date from Unix Time Seconds",
            helperText: moment().format(secondsFormat).toString(),
            inputType: "dateOfUnixTimeSeconds",
            state: state.dateOfUnixTimeSeconds,
            format: secondsFormat
        },
        {
            label: "Date from Unix Time MillSeconds",
            helperText: moment().format(millSecondsFormat).toString(),
            inputType: "dateOfUnixTimeMillSeconds",
            state: state.dateOfUnixTimeMillSeconds,
            format: millSecondsFormat
        },
        {
            label: "Date from Unix Time MicroSeconds",
            helperText: moment().format(microSecondsFormat).toString(),
            inputType: "dateOfUnixTimeMicroSeconds",
            state: state.dateOfUnixTimeMicroSeconds,
            format: microSecondsFormat
        },
        {
            label: "Date from Unix Time NanoSeconds",
            helperText: moment().format(nanoSecondsFormat).toString(),
            inputType: "dateOfUnixTimeNanoSeconds",
            state: state.dateOfUnixTimeNanoSeconds,
            format: nanoSecondsFormat
        }
    ]

    return <>
        <Overview title={card.title} description={card.description}/>
        <div className={classes.inputArea}>
            {
                unixSecondViews.map((v, i) => {
                    return <div key={`unix_time_${i}`}>
                        <Typography variant={"h5"}>{v.label}</Typography>
                        <TextField
                            name={`unixtime_${i}`}
                            type={"text"}
                            className={classes.text}
                            helperText={v.helperText}
                            onChange={e => dispatch({event: e, inputType: v.inputType, value: e.target.value})}
                            InputProps={{
                                inputProps: {
                                    value: v.state ? v.state : "",
                                    dispatch: dispatch,
                                    actionType: v.inputType,
                                    excludeCharactersRegexp: "^(?![0-9]).*"
                                } as InputTextMemorizedCursorProps,
                                inputComponent: InputTextMemorizedCursor
                            }}
                        />
                    </div>
                })
            }
            <div/>
            <div/>
            <div/>
            <div/>
            {
                momentViews.map((v, i) =>
                    <div key={`moment_view_${i}`}>
                        <Typography variant={"h5"}>{v.label}</Typography>
                        <TextField
                            className={classes.text}
                            helperText={v.helperText}
                            onChange={e => dispatch({event: e, inputType: v.inputType, value: e.target.value})}
                            InputProps={{
                                inputProps: {
                                    value: v.state ? v.state : "",
                                    dispatch: dispatch,
                                    actionType: v.inputType,
                                    excludeCharactersRegexp: "^(?![0-9]).*"
                                } as InputTextMemorizedCursorProps,
                                inputComponent: InputTextMemorizedCursor
                            }}
                        />
                    </div>
                )
            }
        </div>
        <Button onClick={() => dispatch({inputType: "clear", value: ""})} variant={"outlined"}
                className={classes.divider}>
            CLEAR
        </Button>
    </>
}