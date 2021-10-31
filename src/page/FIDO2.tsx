import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {hostname} from "os";
import {Overview} from "./modlecules/Overview";
import {useLocation} from "react-router-dom";
import {cards} from "../const/Cards";
import {makeStyles} from "@material-ui/core/styles";
import {RadioButtonChecked} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    column1Area: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "40vw"
    },
    column2Area: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateColumns: "20vw 20vw"
    },
    text: {
        width: "20vw"
    },
    noContent: {
        display: "contents"
    },
    divider: {
        margin: theme.spacing(2),
    }
}));

const FIDO2 = () => {
    const classes = useStyles()
    const location = useLocation()
    const card = cards.filter(e => e.link === location.pathname)[0]
    const [output, setOutput] = useState("")
    const arrayBufferToString = (target: ArrayBuffer) => {
        return new TextDecoder().decode(target)
    }

    const [user, setUser] = useState({
        id: new Uint8Array(16),
        name: "testuser",
        displayName: "Yamada Tarou"
    })

    const [attestation, setAttestation] = useState<AttestationConveyancePreference | undefined>("none")
    const [authenticatorSelection, setAuthenticatorSelection] = useState({
        userVerification: "discouraged",
        requireResidentKey: false,
        authenticatorAttachment: undefined,
        residentKey: "discouraged"
    } as AuthenticatorSelectionCriteria)
    const [alg, setAlg] = useState("-7")

    const [credentialId, setCredentialID] = useState("")

    const challenge = new Uint8Array([ // サーバーから暗号学的にランダムな値が送られていなければならない
        0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
        0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
    ])
    const createInput: CredentialCreationOptions = {
        publicKey: {
            // Relying Party (a.k.a. - Service):
            rp: {
                id: hostname(),
                name: "Acme"
            },
            authenticatorSelection: authenticatorSelection,
            // User:
            user: user,
            pubKeyCredParams: [{
                type: "public-key",
                alg: Number(alg)
            }],
            attestation: attestation,
            timeout: 60000,
            challenge: challenge.buffer
        }
    }
    const handleRegister = () => {
        navigator.credentials.create(createInput)
            .then((r: (Credential | null)) => {
                if (r) {
                    console.log(`credential response:${JSON.stringify(r)}`)
                    setCredentialID(r.id)
                    if (r instanceof PublicKeyCredential) {
                        console.log(`credential is PublicKeyCredential`)
                        console.log(r)
                        setCredentialID(r.id)
                        setOutput(JSON.stringify({
                            id: r.id,
                            rawId: arrayBufferToString(r.rawId),
                            response: {
                                // attestationObject: arrayBufferToString(r.response.attestationObject),
                                clientDataJSON: arrayBufferToString(r.response.clientDataJSON)
                            },
                            type: r.type
                        }))
                    }
                }
            })
            .catch(e => {
                setOutput(JSON.stringify(e))
                console.error(e)
            })
    }

    const handleGet = ()=>{
        const options = {
            publicKey: {
                challenge: challenge.buffer,
                timeout: 60000,
                userVerification: authenticatorSelection.userVerification,
                allowCredentials: [{
                    type: "public-key",
                    transports: ["ble", "usb","nfc","internal"],
                    id: new TextEncoder().encode(credentialId)
                }],
                extensions: undefined,
                rpId: hostname()
            }
        } as CredentialRequestOptions
        navigator.credentials.get(options).then((r: Credential|null) =>{
            if (r) {
                if (r instanceof PublicKeyCredential) {

                }
            }
        })
    }


    const [isUserVerifyingPlatformAuthenticatorAvailable, setUserVerifyingPlatformAuthenticatorAvailable] = useState(false)

    useEffect(() => {
        if (window.PublicKeyCredential)
            window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(r => {
                console.log(`isUserVerifyingPlatformAuthenticatorAvailable:${r}`)
                setUserVerifyingPlatformAuthenticatorAvailable(r)
            })
    }, [])

    return <>
        <Overview title={card.title} description={card.description}/>
        <div className={classes.column2Area}>
            <label>isUserVerifyingPlatformAuthenticatorAvailable</label>
            <div>{`${isUserVerifyingPlatformAuthenticatorAvailable}`}</div>
        </div>
        <div className={classes.column2Area}>
            <label>Name</label>
            <TextField name={"name"} value={user.name} onChange={e => setUser({
                ...user,
                name: e.target.value
            })}/>
            <label>DisplayName</label>
            <TextField name={"displayName"} value={user.displayName} onChange={e => setUser({
                ...user,
                displayName: e.target.value
            })}/>
            <label>attestation</label>
            <TextField name={"attestation"} value={attestation}
                       onChange={e => setAttestation(e.target.value as AttestationConveyancePreference)}
                       helperText={`"direct" | "enterprise" | "indirect" | "none"`}/>
            <label>platform</label>
            <TextField name={"platform"} value={authenticatorSelection.authenticatorAttachment}
                       onChange={e => setAuthenticatorSelection({
                           ...authenticatorSelection,
                           authenticatorAttachment: e.target.value as AuthenticatorAttachment
                       })
                       } helperText={`"cross-platform" | "platform"`}/>
            <label>requireResidentKey</label>
            <RadioGroup aria-label={"requireResidentKey"} row>
                <FormControlLabel control={<Radio/>} label={"true"} checked={authenticatorSelection.requireResidentKey}
                                  onClick={() => setAuthenticatorSelection({
                                      ...authenticatorSelection,
                                      requireResidentKey: true
                                  })}/>
                <FormControlLabel control={<Radio/>} label={"false"} checked={!authenticatorSelection.requireResidentKey}
                                  onClick={() => setAuthenticatorSelection({
                                      ...authenticatorSelection,
                                      requireResidentKey: false
                                  })}/>
            </RadioGroup>
            <label>residentKey</label>
            <TextField name={"residentKey"} value={authenticatorSelection.residentKey}
                       onChange={e => setAuthenticatorSelection({
                           ...authenticatorSelection,
                           residentKey: e.target.value as ResidentKeyRequirement
                       })}
                       helperText={`"discouraged" | "preferred" | "required"`}
            />
            <label>userVerification</label>
            <TextField name={"userVerification"} value={authenticatorSelection.userVerification}
                       onChange={e => setAuthenticatorSelection({
                           ...authenticatorSelection,
                           userVerification: e.target.value as UserVerificationRequirement
                       })} helperText={`"discouraged" | "preferred" | "required"`}/>
            <label>algorithm</label>
            <TextField name={"algorithm"} value={alg}
                // onBlur={e=> setAlg(Number(e.target.value))}
                       onChange={e => setAlg(e.target.value)}
                       helperText={`number`}/>
        </div>
        <Button onClick={handleRegister} variant={"outlined"}>Register</Button>
        <Button onClick={handleGet} variant={"outlined"}>Get</Button>
        <br/>
        <div className={classes.column1Area}>
            <h2>output</h2>
            <div>{output}</div>
            <h2>input</h2>
            <textarea cols={80} rows={20} value={JSON.stringify(createInput)} disabled={true}/>
        </div>
        <label htmlFor={"credentialId"}>credentialId</label>
        <div id={"credentialId"}>{credentialId}</div>
        <br/>
    </>
}

export default FIDO2