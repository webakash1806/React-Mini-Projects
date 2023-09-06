import { useCallback, useEffect, useState, useRef } from "react"

const Pass = () => {

    const [length, setLength] = useState(8)
    const [isCharacter, setIsCharacter] = useState(false)
    const [isNumber, setIsNumber] = useState(false)
    const [password, setPassword] = useState('')

    const randomPassword = useCallback(() => {
        let passwordValue = ''
        let value = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        if (isCharacter) {
            value += '*@!%#*@$!%#'
        }
        if (isNumber) {
            value += '01234567890123456789'
        }

        for (let i = 1; i <= length; i++) {
            const randomValue = Math.floor(Math.random() * value.length + 1)
            passwordValue += value.charAt(randomValue)
            // console.log(passwordValue)
        }
        setPassword(passwordValue)
    }, [length, isNumber, isCharacter, setPassword])

    // console.log(password)

    const passwordCopyValue = useRef(null)

    const passwordCopy = () => {
        passwordCopyValue.current?.select()
        window.navigator.clipboard.writeText(password)
    }

    useEffect(() => { randomPassword() }, [isCharacter, isNumber, length, setPassword])


    return (
        <>
            <div className="main flex flex-col items-center justify-center bg-[#282828] w-fit rounded-lg p-6 py-4 mt-9">
                <p className="text-white font-semibold text-3xl">Password Generator</p>
                <div className="my-5 flex flex-col sm:flex-row bg-purple-600 rounded-md">
                    <input className="text-center bg-white w-[20rem] md:w-[28rem] p-2 rounded-md  outline-none font-semibold tracking-wide"
                        type="text"
                        readOnly
                        value={password}
                        ref={passwordCopyValue}
                    />
                    <button className="bg-purple-600 p-2 px-4 font-semibold text-white rounded-md sm:rounded-l-none tracking-wide" onClick={passwordCopy}>COPY</button>
                </div>
                <div className="text-white flex flex-col md:flex-row md:gap-5 items-center justify-center gap-3 text-[1.4rem] tracking-wide my-5">
                    <p className="">Length : {length}</p>
                    <input className="accent-purple-500 w-[15rem] md:w-[7rem] h-6 cursor-pointer"
                        type="range"
                        name=""
                        min={5} max={30}
                        value={length}
                        onChange={(e) => setLength(e.target.value)} />
                    <div className="flex items-center justify-center gap-3">
                        <input className="accent-purple-600 w-5 h-5" type="checkbox" defaultChecked={isNumber} name="" id="" onChange={() => setIsNumber((prev) => !prev)} />
                        <label htmlFor="">Number</label>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <input className="accent-purple-600 w-5 h-5" type="checkbox" name="" id="" onChange={() => setIsCharacter((prev) => !prev)} />
                        <label htmlFor="">Character</label>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Pass
