import {Button, Card, CardActions, CardContent, CardHeader} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {PropsWithChildren, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {usePage} from "../context/PageContextProvider";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
    },
    cards: {
        display: "flex",
        flexFlow: "wrap"
    },
    card: {
        margin: "1px 1px 1px 1px",
        width: "20vw"
    }
}));

export interface CardInterface {
    title: string
    description: string
    link: string
    overflow?: JSX.Element
    pageComponent?: JSX.Element
}

export interface TopPageInterface {
    cards: CardInterface[]
}

export const TopPage = (props: PropsWithChildren<TopPageInterface>) => {
    const classes = useStyles();
    const history = useHistory()
    const page = usePage()

    useEffect(() => {
        page.setTitle("Applications")
    }, [page])

    return (<>
            <Typography variant="h2" component="h1" gutterBottom>
                {page.title}
            </Typography>
            <div className={classes.cards}>
                {props.cards.map((e, i) => {
                    return <Card className={classes.card} variant={"outlined"} key={`card_${i}`}>
                        <CardHeader title={e.title}/>
                        <CardContent>
                            <Typography variant={"body1"}>
                                {e.overflow ? e.overflow : ""}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size={"small"} onClick={() => {
                                console.log(`move to ${e.title} ${e.link}`)
                                page.setTitle(e.title)
                                history.push(e.link)
                            }} variant={"outlined"}>
                                OPEN
                            </Button>
                        </CardActions>
                    </Card>
                })}
            </div>
        </>
    )
}