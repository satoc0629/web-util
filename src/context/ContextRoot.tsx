import {PageContextProvider} from "./PageContextProvider";
import {PropsWithChildren} from "react";
import {ThemeContextProvider} from "./ThemeContext";

export const ContextRoot = (props: PropsWithChildren<any>) => {
    return <ThemeContextProvider>
        <PageContextProvider>
            {props.children}
        </PageContextProvider>
    </ThemeContextProvider>
}