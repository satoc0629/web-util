import React, {createRef, PropsWithChildren, useEffect, useRef, useState} from "react";
import {InputBaseComponentProps} from "@material-ui/core";
import {UnixTimeActionType} from "../UnixTime";

export interface InputTextMemorizedCursorProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    dispatch: React.DispatchWithoutAction
    inputType: UnixTimeActionType // よくない依存関係
    excludeCharactersRegexp?: string
}

export const InputTextMemorizedCursor = (props: PropsWithChildren<InputBaseComponentProps>) => {
    const {inputRef, inputType, excludeCharactersRegexp, dispatch, ...other} = props;

    const maxLength = useRef(props.value.length - 1)
    const [positionStart, setPositionStart] = useState(props.value.length - 1)
    const [positionEnd, setPositionEnd] = useState(props.value.length)
    const [reCursorHash, setReCursorHash] = useState(0)

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setReCursorHash(Math.random)
    }

    const count = (type: 'up' | 'down') => {
        const valueString = String(props.value)
        const currentPart = Number(valueString.substr(positionStart, 1))
        if (isNaN(currentPart)) {
            return
        }
        const nextPartTemp = type === "up" ? currentPart + 1 : currentPart - 1
        let nextPart: number = 0
        if (nextPartTemp >= 10) {
            nextPart = nextPartTemp - 10
        } else if (nextPartTemp < 0) {
            nextPart = 9
        } else {
            nextPart = nextPartTemp
        }

        const nextValue = valueString.substr(0, positionStart) +
            nextPart.toString() +
            valueString.substr(positionStart + 1)
        props.dispatch({
            inputType: props.inputType, value: nextValue
        })
        setReCursorHash(Math.random)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // console.log(`e.key:${e.key}`)

        // 0-9以外のとき
        let regexp = RegExp(props.excludeCharactersRegexp, 'g')
        let match = regexp.exec(e.key)
        if (!e.ctrlKey && e.key.length === 1) {
            if (props.excludeCharactersRegexp && match && match.length > 0) {
                // match.forEach(m => console.log(`m:${m}`))
                e.preventDefault()
                e.stopPropagation()
                setReCursorHash(Math.random)
                return
            }
        }

        const availableNumberPosition = (adjustmentPosition: number = 0) => {
            regexp = RegExp(props.excludeCharactersRegexp, 'g')
            const currentValue = e.currentTarget.value.substr(positionStart + adjustmentPosition, 1)
            // console.log(`currentValue:${currentValue}`)
            match = regexp.exec(currentValue)
            if (match && match.length > 0) {
                // match.forEach(m => console.log(`m:${m}`))
                e.preventDefault()
                e.stopPropagation()
                setReCursorHash(Math.random)
                return false
            }
            return true
        }

        let movePos = 1

        switch (e.key) {
            case "ArrowUp":
                if (availableNumberPosition()) {
                    count('up')
                }
                setReCursorHash(Math.random)
                break
            case "ArrowDown":
                if (availableNumberPosition()) {
                    count('down')
                }
                setReCursorHash(Math.random)
                break
            case "ArrowLeft":
                if (!availableNumberPosition(-1)) {
                    movePos++
                }
                if (0 < positionStart) {
                    setPositionStart(positionStart - movePos)
                    setPositionEnd(positionEnd - movePos)
                } else {
                    e.preventDefault()
                }

                break
            case "ArrowRight":
                if (!availableNumberPosition(1)) {
                    movePos++
                }
                if (positionStart < maxLength.current) {
                    setPositionStart(positionStart + movePos)
                    setPositionEnd(positionEnd + movePos)
                } else {
                    e.preventDefault()
                }
                break
            case "Home":
                setPositionStart(0)
                setPositionEnd(1)
                setReCursorHash(Math.random())
                break
            case "End":
                setPositionStart(maxLength.current)
                setPositionEnd(maxLength.current + 1)
                setReCursorHash(Math.random())
                break
            case "Backspace":
            case "Delete":
                e.preventDefault()
                break
            default:
                setReCursorHash(Math.random())
        }
    }
    const ref = createRef<HTMLInputElement>()

    const cursorUpdate = () => {
        ref.current?.setSelectionRange(positionStart, positionEnd)
    }
    useEffect(cursorUpdate, [positionStart, positionEnd, props.value, reCursorHash, ref])

    return <input {...other} ref={ref} onFocus={onFocus} onKeyDown={onKeyDown}
                  onClick={event => setReCursorHash(Math.random)}/>
}