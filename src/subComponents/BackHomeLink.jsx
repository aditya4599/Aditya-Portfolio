import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'motion/react'

// "← Back to home", shared by the inner pages. Each page positions it
// through `className`; the look stays identical everywhere. Uses the
// router (no page reload), so the usual page-transition curtain plays.
const Link = styled(NavLink)`
display: inline-block;
color: ${props => props.theme.text};
font-family: 'Karla', sans-serif;
font-weight: 600;
text-decoration: none;
border-bottom: 1px solid currentColor;
padding: 0.4rem 0 0.2rem;
`

const BackHomeLink = ({ className, delay = 0 }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
        <Link to="/">← Back to home</Link>
    </motion.div>
)

export default BackHomeLink
