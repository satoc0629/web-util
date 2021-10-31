import * as functions from "firebase-functions";
import {getIP} from "./service/GetIP";
// import * as ip6addr from "ip6addr"
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const yourIP1 = functions.https.onRequest((request, response) => {
//     const ip = getIP(request)
//     functions.logger.info("Access Origin IP:", ip);
//     response.send(JSON.stringify(
//         {ipv6: ip, headers: request.headers}
//     ));
// });
export const yourIP = functions.https.onCall((data, context) => {
    const ip = getIP(context.rawRequest)
    functions.logger.info("Access Origin IP:", ip);
    return {data: {ip: ip, header: context.rawRequest.headers}}
});

export const testSVG = functions.https.onCall((data, context) => {
    return
})

// @ts-ignore
function setResponse(response: functions.Response<any>) {
    response.set('Access-Control-Allow-Origin',
        'http://localhost:3000, https://webutil-b4b49.web.app, https://webutil-b4b49.firebaseapp.com')
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
    // ログイン時のアクセストークンを受け入れる
    response.set('Access-Control-Allow-Headers', 'Content-Type,content-type,authorization,Referer, User-Agent')
    response.set('Content-Type', 'application/json')
    response.set('Accept', '*')
}
