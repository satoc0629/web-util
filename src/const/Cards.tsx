import {CardInterface} from "../page/TopPage"
import {lazy, Suspense} from "react"
import Loading from "../page/atoms/Loading";
import FIDO2 from "../page/FIDO2";

const URLEncoderDecoder = lazy(() => import("../page/URLEncoderDecoder"))
const GlobalIP = lazy(() => import("../service/GlobalIP"))
const Base64EncoderDecoder = lazy(() => import("../page/Base64EncoderDecoder"))
const UnixTime = lazy(() => import("../page/UnixTime"))

export const cards: CardInterface[] = [
    {
        title: "Markdown用テーブルを列から生成",
        description: "マークダウン用エディタ",
        link: "/md/fromColumn"
    },
    {
        title: "Qiita用環境バッジ",
        description: "Qiita投稿用環境入力",
        link: "/qiita/badge"
    },
    {
        title: "URLエンコーダー・デコーダー",
        description: "URL Encoder/Decoder",
        link: "/url/converter",
        pageComponent: <Suspense fallback={<Loading/>}><URLEncoderDecoder/></Suspense>
    },
    {
        title: "BASE64エンコーダー・デコーダー",
        description: "Base64 Encoder/Decoder",
        link: "/base64/converter",
        pageComponent: <Suspense fallback={<Loading/>}><Base64EncoderDecoder/></Suspense>
    },
    {title: "JSONパーサー", description: "JSON Parser", link: "/json/parser"},
    {
        title: "GlobalIP 確認",
        description: "Your Global IP",
        link: "/your/ip",
        overflow: <Suspense fallback={<Loading/>}><GlobalIP/></Suspense>
    },
    {
        title: "UNIXタイム相互変換", description: "UnixTimeと日付文字列の相互変換", link: "/unix/time", pageComponent:
            <Suspense fallback={<Loading/>}><UnixTime/></Suspense>
    },
    {title: "JWTエンコード", description: "JSON Web Token Encode.", link: "/json/jwt"},
    {title: "VBA一発作業用", description: "VPA SCRIPTS", link: "/vba/onetime"},
    {title: "テキストの矩形切り取り", description: "TEXT Rectangle", link: "/text/rectangle"},
    {
        title: "指紋認証器登録",
        description: "指紋認証登録起動",
        link: "/fido2",
        pageComponent: <Suspense fallback={<Loading/>}>
            <FIDO2/>
        </Suspense>
    }
]