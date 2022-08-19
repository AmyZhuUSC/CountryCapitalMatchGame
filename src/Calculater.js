import React, {useEffect, useState} from "react"
import "./App.css"

export default function Calculater() {
    const [inputStr, setInputStr] = useState("");
    const [validStr, setValidStr] = useState("");
    const [res, setRes] = useState(0);
    const specialInput = ["+", "-", "*", "/", "="];

    function handleInput(e) {
        const strInput = e.target.value;
        // make sure it is a valid math expression using string
        if (specialInput.includes(strInput.slice(-1))) {
            if (inputStr.length > 0) { // special character is not in the first place
                if (specialInput.includes(inputStr.slice(-1))) {
                    // console.log(inputStr)// if last input is special character, then repalce last one with current one
                    setInputStr(inputStr.slice(0, -1)+ strInput.slice(-1));
                    setValidStr(inputStr.slice(0, -1)+ strInput.slice(-1));
                } else {
                    // console.log(inputStr) // Last input is not special character, add current one directly
                    setInputStr(inputStr + strInput.slice(-1));
                    setValidStr(inputStr + strInput.slice(-1));
                }
            }
        } else {
            setInputStr(inputStr + strInput.slice(-1));
            setValidStr(inputStr + strInput.slice(-1));
        }
    }
// string to math expression
    function parse(str) {
        return Function(`'use strict'; return (${str})`)()
        }

    function handleSubmit(e) {
        // if final input is a special character, ignore it
        if (specialInput.includes(inputStr.slice(-1))) {
            setRes(parse(inputStr.slice(0, -1)));
        } else {
            setRes(parse(inputStr));
        }
        // reset the input
        setInputStr("");
        e.preventDefault()
    }
    return (
        <div className = "wholeApp">
            <div className="panel">
                <div className="inputMath">{validStr}</div>
                <div>={res}</div>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <input value={inputStr}
                onChange={e => handleInput(e)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}