import React, {PropsWithChildren} from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
    body1: string
}
export const Body1 = (props:PropsWithChildren<Props>)=>{
    return <Typography variant={"body1"}>
        {props.body1}
    </Typography>
}