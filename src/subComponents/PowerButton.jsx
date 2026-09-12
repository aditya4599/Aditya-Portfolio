// Home button

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { PowerBtn } from '../components/AllSvgs'


// A single link rather than a <button> wrapping a link: nested
// interactive elements confuse keyboard and screen-reader users.
const Power = styled(NavLink)`
position: fixed;
top: 2rem;
left: 50%;
transform: translate(-50%, 0);

background-color: #FCF6F4;
color: #000;
padding: 0.3rem;
border-radius: 50%;
border: 1px solid #000;
width: 2.5rem;
height: 2.5rem;

display: flex;
justify-content: center;
align-items:center;
z-index:3;

cursor: pointer;
text-decoration: none;

&:hover{
    background-color: rgba(0,255,0,0.4);
    box-shadow: 0 0 8px 6px rgba(0,255,0,0.2);
}

&:focus-visible {
    outline: 2px solid #000;
    outline-offset: 3px;
}
`

const PowerButton = () => {
    return (
        <Power to="/" aria-label="Home">
            <PowerBtn width={30} height={30} fill='currentColor' />
        </Power>
    )
}

export default PowerButton
