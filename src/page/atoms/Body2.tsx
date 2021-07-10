import React, {PropsWithChildren} from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
    body2: string
}
export const Body2 = (props:PropsWithChildren<Props>)=>{
    return <Typography variant={"body2"}>
        {props.body2}
    </Typography>
}