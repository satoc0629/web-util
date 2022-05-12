import {ConvertTemplateOneToOne} from "./templates/ConvertTemplateOneToOne";

const JSONBase64EncoderDecoder = () => {

    const encode = (arg: string) => {
        try {
            return btoa(unescape(encodeURIComponent(arg)))
        } catch (e) {
            console.error(e)
            return ""
        }
    }

    const decode = (arg: string) => {
        try {
            return JSON.stringify(JSON.parse(decodeURIComponent(escape(atob(arg)))), null, "  ");
        } catch (e) {
            console.error(e)
            return ""
        }
    }

    return <ConvertTemplateOneToOne description={"JSON Base64Encoder/Decoderです。"}
                                    leftTitle={"Encode"} rightTitle={"Decode"}
                                    leftPlaceholder={"{\"name\":\"test\"}"}
                                    rightPlaceholder={"44GT44KT44Gr44Gh44Gv"}
                                    onLeftToRight={encode} onRightToLeft={decode}/>
}
export default JSONBase64EncoderDecoder