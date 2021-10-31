import React, {PropsWithChildren} from "react"
import {ConvertTemplateOneToOne} from "./templates/ConvertTemplateOneToOne"

const URLEncoderDecoder = (props: PropsWithChildren<any>) => {
    return <ConvertTemplateOneToOne description={"UTF8のみ対応"}
                                    leftTitle={"Encode"}
                                    leftPlaceholder={"encode string https://www.google.com/search?q=こんにちは"}
                                    rightTitle={"Decode"}
                                    rightPlaceholder={"decode string https://www.google.com/search?q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF"}
                                    onLeftToRight={(arg) => encodeURI(arg)}
                                    onRightToLeft={(arg) => decodeURI(arg)}
    >
    </ConvertTemplateOneToOne>
}
export default URLEncoderDecoder