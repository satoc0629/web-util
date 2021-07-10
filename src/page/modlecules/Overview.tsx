import React, {PropsWithChildren} from "react";
import {Title} from "../atoms/Title";
import {Body1} from "../atoms/Body1";

interface Props {
    title: string
    description: string
}

export const Overview = (props: PropsWithChildren<Props>) => {
    return <>
        <Title title={props.title}/>
        <Body1 body1={props.description}/>
    </>
}