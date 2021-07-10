import {CardInterface} from "../page/TopPage";
import {URLEncoderDecoder} from "../page/URLEncoderDecoder";
import {GlobalIP} from "../service/GlobalIP";
import {Base64EncoderDecoder} from "../page/Base64EncoderDecoder";
import {UnixTime} from "../page/UnixTime";

export const cards: CardInterface[] = [
    {title: "Qiita用環境バッジ", description: "Qiita投稿用環境入力", link: "/qiita/badge"},
    {
        title: "URLエンコーダー・デコーダー",
        description: "URL Encoder/Decoder",
        link: "/url/converter",
        pageComponent: <URLEncoderDecoder/>
    },
    {
        title: "BASE64エンコーダー・デコーダー",
        description: "Base64 Encoder/Decoder",
        link: "/base64/converter",
        pageComponent: <Base64EncoderDecoder/>
    },
    {title: "JSONパーサー", description: "JSON Parser", link: "/json/parser"},
    {title: "GlobalIP 確認", description: "Your Global IP", link: "/your/ip", overflow: <GlobalIP/>},
    {title: "UNIXタイム相互変換", description: "UnixTimeと日付文字列の相互変換", link: "/unix/time", pageComponent: <UnixTime/>},
    {title: "JWTエンコード", description: "JSON Web Token Encode.", link: "/json/jwt"},
    {title: "VBA一発作業用", description: "VPA SCRIPTS", link: "/vba/onetime"},
    {title: "テキストの矩形切り取り", description: "TEXT Rectangle", link: "/text/rectangle"}
]