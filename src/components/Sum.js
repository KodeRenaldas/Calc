import React from "react"
import styled from "styled-components"

    const Wrapper = styled.div`
    width: 100%;
    margin: 1em 0;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background: ${props => props.theme.screen};
    `
    const Total = styled.h1`
    color: ${props => props.theme.keytext==="hsl(221, 14%, 31%)"?props.theme.text:props.theme.keytext};
    padding: 0.5em;
    margin: 0;
    @media (max-width: 500px) {
        margin: 0.5em;
        padding: 0;
    }
    `
    const Current = styled(Total)`
    ` 

export default function Sum(props) {
    return (
        <Wrapper>
            <Total>{props.sum?props.sum:null}</Total>
            <Current>{props.currentNum?props.currentNum:0}</Current>
        </Wrapper>
    )
}