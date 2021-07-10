import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState} from "react";

interface PageContext {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
}

const PageContextImpl = createContext({} as PageContext)

export const PageContextProvider = (props: PropsWithChildren<any>) => {

    const [title, setTitle] = useState("")
    const pageContext = {title: title, setTitle: setTitle} as PageContext

    return <PageContextImpl.Provider value={pageContext}>
        {props.children}
    </PageContextImpl.Provider>
}

export const usePage = () => {
    const context = useContext(PageContextImpl)
    return context
}