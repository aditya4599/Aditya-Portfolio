import { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.76, 0, 0.24, 1]

// Black panel that sweeps across between pages. It's a fixed sibling of
// the page (never a transformed parent), so pages that rely on
// position: fixed — Work's card track, the social bar — keep working.
const Curtain = styled(motion.div)`
position: fixed;
inset: 0;
z-index: 100;
background: #000;
pointer-events: none;
`

const PageTransition = ({ children }) => {
    const reduce = useReducedMotion()

    // Every page starts at the top (Work scrolls a long way).
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (reduce) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                {children}
            </motion.div>
        )
    }

    return (
        // The wrapper only "animates" opacity to 0.999 on exit so the
        // presence system waits for the curtain to cover the screen.
        <motion.div exit={{ opacity: 0.999, transition: { duration: 0.55 } }}>
            {children}
            {/* Reveals the new page: lifts off upward */}
            <Curtain
                aria-hidden="true"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0, transition: { duration: 0.75, ease: EASE, delay: 0.05 } }}
                exit={{ scaleY: 0 }}
                style={{ originY: 0 }}
            />
            {/* Covers the old page: rises from the bottom */}
            <Curtain
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1, transition: { duration: 0.55, ease: EASE } }}
                style={{ originY: 1 }}
            />
        </motion.div>
    )
}

export default PageTransition
