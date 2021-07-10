import * as functions from "firebase-functions";

export const getIP = (req: functions.https.Request) => {
    if (req.ip) {
        return req.ip
    }
    return '0.0.0.0'
//     // return req.headers.get('x-forwarded-for')
//     // if (req.headers['x-forwarded-for']) {
//     //     return req.headers['x-forwarded-for'];
//     // }
//     // if (req.connection && req.connection.remoteAddress) {
//     //     return req.connection.remoteAddress;
//     // }
//     // if (req.connection.socket && req.connection.socket.remoteAddress) {
//     //     return req.connection.socket.remoteAddress;
//     // }
//     // if (req.socket && req.socket.remoteAddress) {
//     //     return req.socket.remoteAddress;
//     // }
//     // return '0.0.0.0';
}
// export function getIPByRawRequest(req: functions.https.Request) {
//     if (req.headers.get('x-forwarded-for')) {
//         return req.headers.get('x-forwarded-for');
//     }
//     // if (req.connection && req.connection.remoteAddress) {
//     //     return req.connection.remoteAddress;
//     // }
//     // if (req.connection.socket && req.connection.socket.remoteAddress) {
//     //     return req.connection.socket.remoteAddress;
//     // }
//     // if (req.socket && req.socket.remoteAddress) {
//     //     return req.socket.remoteAddress;
//     // }
//     return '0.0.0.0';
// }
//
