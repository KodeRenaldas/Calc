import React from "react"
import styled from "styled-components"

    const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    `
    const HeaderText = styled.h2`
    color: ${props => props.theme.keytext==="hsl(221, 14%, 31%)"?props.theme.text:props.theme.keytext};
    margin: 0;
    `
    const Theme = styled.div`
    display: flex;
    `
    const ThemeHeader = styled.div`
    margin: 0 0.25em;
    color: ${props => props.theme.keytext==="hsl(221, 14%, 31%)"?props.theme.text:props.theme.keytext};
    align-self: flex-end;
    font-weight: bold;
    `
    const ThemeWrapper = styled(Wrapper)`
    flex-direction: column;
    width: 70px;
    `
    const ThemeNumbers = styled(Wrapper)`
    `
    const ThemeNumber = styled.p`
    margin: 0;
    color: ${props => props.theme.keytext==="hsl(221, 14%, 31%)"?props.theme.text:props.theme.keytext};
    font-size: 1.125rem;
    `
    const ButtonWrapper = styled(ThemeWrapper)`
    flex-direction: row;
    background: ${props => props.theme.keypad};
    border-radius: 10px;
    `
    const ThemeButton = styled.input`
    margin: 0.2em;
    border-radius: 50%;
    padding: 0.5em;
    appearance: none;
    border: 1px solid ${props => props.text};
    &:checked {
        background-color: ${props => props.theme.equal};
    }
    `

export default function Header(props) {
    return (
        <Wrapper>
            <HeaderText>calc</HeaderText>
            <Theme>
                <ThemeHeader>theme</ThemeHeader>
                <ThemeWrapper>
                    <ThemeNumbers>
                        <ThemeNumber>1</ThemeNumber>
                        <ThemeNumber>2</ThemeNumber>
                        <ThemeNumber>3</ThemeNumber>
                    </ThemeNumbers>
                    <ButtonWrapper>
                        <ThemeButton type="radio" onClick={props.one} value="1" name="theme"defaultChecked={true}/>
                        <ThemeButton type="radio" onClick={props.two} value="2" name="theme"/>
                        <ThemeButton type="radio" onClick={props.three} value="3" name="theme"/>
                    </ButtonWrapper>
                </ThemeWrapper>
            </Theme>
        </Wrapper>
    )
}