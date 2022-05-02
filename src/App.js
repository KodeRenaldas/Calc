import React, {useEffect, useState, createContext} from "react"
import styled, {ThemeProvider} from "styled-components"
import {Themes} from "./theme/Themes"
import Header from "./components/Header"
import Sum from "./components/Sum"
import GlobalStyle from "./theme/GlobalStyle"
import {nanoid} from "nanoid"

    const Div = styled.div`
    min-width: 100vh;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.main};
    `
    const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    `
    const Grid = styled.div`
    display: grid;
    grid-template-rows: auto;
    padding: 1em;
    grid-template-areas:
        'seven eight nine del'
        'four five six plus'
        'one two three minus'
        'dot zero slash x'
        'reset reset equal equal';
    grid-gap: 1em;
    background: ${props => props.theme.keypad};
    `
    const Btn = styled.button`
    grid-area: ${props => props.position};
    margin: 0;
    padding: 1em;
    background: ${props => props.theme.keynumbg};
    color: ${props => props.theme.keytext};
    background: ${props => props.position==="del"&&props.theme.keybg};
    color: ${props => props.position==="del"&&props.theme.text};
    border: none;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.125rem;
    cursor: pointer;
    `
    const Reset = styled.button`
    grid-area: reset;
    background: ${props => props.theme.keybg};
    color: ${props => props.theme.text};
    border: none;
    border-radius: 10px;
    padding: 1em;
    font-weight: bold;
    font-size: 1.125rem;
    cursor: pointer;
    `
    const Equal = styled.button`
    grid-area: equal;
    background: ${props => props.theme.equal};
    color: ${props => props.theme.text};
    border: none;
    border-radius: 10px;
    padding: 1em;
    font-weight: bold;
    font-size: 1.125rem;
    cursor: pointer;
    `
export const UserContext = createContext()
export default function App() {
    const [currentTheme, setCurrentTheme] = useState(Themes[0])
    const [firstNum, setFirstNum] = useState()
    const [secondNum, setSecondNum] = useState()
    const [state, setState] = useState()
    const [sum, setSum] = useState()
    const [display, setDisplay] = useState()
    useEffect(() => {
        state?setDisplay(secondNum):setDisplay(firstNum)
    }, [firstNum, secondNum])
    const btnNum = [
        {num: 1, position:"one"},
        {num: 2, position:"two"},
        {num: 3, position:"three"},
        {num: 4, position:"four"},
        {num: 5, position:"five"},
        {num: 6, position:"six"},
        {num: 7, position:"seven"},
        {num: 8, position:"eight"},
        {num: 9, position:"nine"},
        {num: 0, position:"zero"},
        {num: ".", position:"dot"},
        {num: "/", position:"slash"},
        {num: "DEL", position:"del"},
        {num: "+", position:"plus"},
        {num: "-", position:"minus"},
        {num:"x", position:"x"}
    ]
    function getSum(a, b) {
        if (state==="+") {
            setSum(parseInt(a)+parseInt(b))
        } else if (state==="-") {
            setSum(parseInt(a)-parseInt(b))
        } else if (state==="/") {
            setSum(parseInt(a)/parseInt(b))
        } else if (state==="x") {
            setSum(parseInt(a)*parseInt(b))
        }
    }
    const btnArr = btnNum.map(btn => {
        return (<Btn position={btn.position} key={nanoid()} onClick={typeof(btn.num)==="number"?!state?() => setFirstNum(firstNum?`${firstNum}${btn.num}`:`${btn.num}`):() => setSecondNum(secondNum?`${secondNum}${btn.num}`:`${btn.num}`):state?() => {
            btn.num==="+"?sum?(() => {
                setState(btn.num)
                getSum(sum, secondNum)})():(() => {
                setState(btn.num)
                getSum(firstNum, secondNum)})():null
            btn.num==="-"?sum?(() => {
                setState(btn.num)
                getSum(sum, secondNum)
            })():(() => {
                setState(btn.num)
                getSum(firstNum, secondNum)})():null
            btn.num==="/"?sum?(() => {
                setState(btn.num)
                getSum(sum, secondNum)
            })():(() => {
                setState(btn.num)
                getSum(firstNum, secondNum)})():null
            btn.num==="x"?sum?(() => {
                setState(btn.num)
                getSum(sum, secondNum)
            })():(() => {
                setState(btn.num)
                getSum(firstNum, secondNum)})():null
            btn.num==="DEL"?state?setSecondNum():setFirstNum():null
        }:() => {
            btn.num==="+"?setState(btn.num):null
            btn.num==="-"?setState(btn.num):null
            btn.num==="/"?setState(btn.num):null
            btn.num==="x"?setState(btn.num):null
            btn.num==="DEL"?state?setSecondNum():setFirstNum():null
        }}>
        {btn.num}
        </Btn>)
    })
    return (    
        <ThemeProvider theme={currentTheme}>
            <UserContext.Provider value={currentTheme}>
                <GlobalStyle/>
                <Div>
                    <Wrapper>
                        <Header one={() => setCurrentTheme(Themes[0])} two={() => setCurrentTheme(Themes[1])} three={() => setCurrentTheme(Themes[2])} currentTheme={currentTheme}/>
                        <Sum sum={sum} currentNum={display}/>
                        <Grid>
                            {btnArr}
                            <Reset onClick={() => {
                                setFirstNum()
                                setSecondNum()
                                setState()
                                setSum()
                            }}>reset</Reset>
                            <Equal onClick={state?secondNum?() => {getSum(firstNum, secondNum);setSecondNum()}:() => getSum(firstNum, firstNum):null}>=</Equal>
                        </Grid>
                    </Wrapper>
                </Div>
            </UserContext.Provider>
        </ThemeProvider>
    )
}