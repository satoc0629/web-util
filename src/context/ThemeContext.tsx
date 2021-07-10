import {createContext, PropsWithChildren, useContext, useEffect, useReducer} from "react";
import {createMuiTheme, MuiThemeProvider, Theme} from "@material-ui/core";
import * as localforage from "localforage";

export type BaseTheme = 'dark' | 'light'

interface ThemeContextInterface {
    theme: Theme
    changeBaseTheme: (baseTheme: BaseTheme) => void
}

const ThemeContextImpl = createContext({} as ThemeContextInterface)

export const ThemeContextProvider = (props: PropsWithChildren<any>) => {
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark"
        }
    })
    const lightTheme = createMuiTheme({
        palette: {
            type: "light"
        }
    })

    const [state, reducer] = useReducer((state: Theme, action: BaseTheme) => {
        let nextTheme: Theme = createMuiTheme()
        if (action === "dark") {
            nextTheme = darkTheme
        }
        if (action === "light") {
            nextTheme = lightTheme
        }
        localforage.setItem("baseTheme", action)
        return nextTheme
    }, createMuiTheme())


    useEffect(() => {
        localforage.getItem<BaseTheme>("baseTheme").then(e => {
            if (e)
                reducer(e)
        })
    }, [])

    return <ThemeContextImpl.Provider value={{theme: state, changeBaseTheme: reducer}}>
        <MuiThemeProvider theme={state}>
            {props.children}
        </MuiThemeProvider>
    </ThemeContextImpl.Provider>
}

export const useThemeContext = () => {
    return useContext(ThemeContextImpl)
}