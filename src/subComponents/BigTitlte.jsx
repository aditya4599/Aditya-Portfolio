import React from 'react'
import styled from 'styled-components'
import { motion } from 'motion/react'


const Text = styled.h1`
position: fixed;
top: ${props => props.$top};
left: ${props => props.$left};
right: ${props => props.$right};
color:${props => `rgba(${props.theme.textRgba},0.1)`};
font-size: calc(5rem + 5vw);
z-index:0;
overflow: hidden;
line-height: 1.1;
pointer-events: none;

span { display: inline-block; }

@media (max-width: 760px) {
    font-size: calc(3.2rem + 5vw);
}
`


const BigTitlte = (props) => {
    return (
        <Text aria-hidden="true" $top={props.top}  $left={props.left}  $right={props.right}>
            <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                style={props.style}
            >
                {props.text}
            </motion.span>
        </Text>
    )
}

export default BigTitlte
