import {ConvertTemplateOneToOne} from "./templates/ConvertTemplateOneToOne";

export const Base64EncoderDecoder = () => {

    const encode = (arg: string) => {
        try {
            return btoa(unescape(encodeURIComponent(arg)))
        }catch (e) {
            console.error(e)
            return ""
        }
    }

    const decode = (arg: string) => {
        try {
            return decodeURIComponent(escape(atob(arg)))
        }catch (e){
            console.error(e)
            return ""
        }
    }

    return <ConvertTemplateOneToOne description={"Base64Encoder/Decoderです。"}
                                    leftTitle={"Encode"} rightTitle={"Decode"}
                                    leftPlaceholder={"こんにちは"}
                                    rightPlaceholder={"44GT44KT44Gr44Gh44Gv"}
                                    onLeftToRight={encode} onRightToLeft={decode}/>
}