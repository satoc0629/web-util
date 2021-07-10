import Typography from "@material-ui/core/Typography";
import React, {PropsWithChildren} from "react";

type Props = {
    title: string
}
export const Title = (props: PropsWithChildren<Props>) => {
    return <Typography variant="h2" component="h1" gutterBottom>
        {props.title}
    </Typography>
}