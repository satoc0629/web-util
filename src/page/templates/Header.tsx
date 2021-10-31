import React from 'react';
import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Dark from '@material-ui/icons/Brightness2';
import Light from '@material-ui/icons/Brightness5';
import {useHistory} from "react-router-dom";
import {useThemeContext} from "../../context/ThemeContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: "10vh"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();

    const theme = useThemeContext()

    const history = useHistory()
    return (
        <div className={classes.root}>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h3"} className={classes.title}
                                onClick={() => history.push("/")}>Web-Util</Typography>
                    <IconButton onClick={() => theme.changeBaseTheme("dark")} aria-label={"Dark"}>
                        <Dark />
                    </IconButton>
                    <IconButton onClick={() => theme.changeBaseTheme("light")} aria-label={"Light"}>
                        <Light/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
