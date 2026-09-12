import React from 'react'
import styled from 'styled-components'
import { DarkTheme } from '../components/Themes'
import { profile } from '../data/profile'




const Logo = styled.h1`
display: inline-block;
color: ${props => props.$color === 'dark' ? DarkTheme.text : DarkTheme.body};
font-family: 'Pacifico',cursive;

position: fixed;
left: 2rem;
top: 2rem;
z-index:3;
`

const LogoComponent = (props) => {
    return (
        <Logo $color={props.theme} aria-label={`${profile.firstName} ${profile.lastName}`}>
          {profile.initials}
        </Logo>
    )
}

export default LogoComponent
