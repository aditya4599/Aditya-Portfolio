import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useMusic } from '../audio/useMusic'

// Equalizer next to the logo. It only pauses / resumes the shared song;
// the song is STARTED by the central "click here" control on the home
// page (see src/audio/musicController.js).
const Box = styled.button`
display:flex;
align-items:center;
cursor:pointer;
position:fixed;
left:8rem;
top:3rem;
z-index:10;
background: none;
border: 0;
padding: 0.25rem;
height: 2rem;
min-width: 2.75rem;
justify-content: center;

&[aria-disabled="true"] { cursor: default; }

&:focus-visible {
    outline: 2px solid ${props => props.theme.text};
    outline-offset: 4px;
    border-radius: 4px;
}

&>*:nth-child(1){
    animation-delay: 0.2s;
}
&>*:nth-child(2){
    animation-delay: 0.3s;
}
&>*:nth-child(3){
    animation-delay: 0.4s;
}
&>*:nth-child(4){
    animation-delay: 0.5s;
}
&>*:nth-child(5){
    animation-delay: 0.8s;
}

/* Reduced motion: no bouncing — show a still "active" pattern instead. */
@media (prefers-reduced-motion: reduce) {
    &>* { animation: none !important; }
    ${props => props.$playing && css`
        &>*:nth-child(1){ transform: scaleY(1.5); }
        &>*:nth-child(2){ transform: scaleY(1.9); }
        &>*:nth-child(3){ transform: scaleY(1.2); }
        &>*:nth-child(4){ transform: scaleY(1.7); }
        &>*:nth-child(5){ transform: scaleY(1.3); }
    `}
}

@media (max-width: 760px) {
    left: 6.4rem; /* clears the logo, stays clear of the power button */
    top: 2.4rem;
}
`

const play = keyframes`
0%{
    transform:scaleY(1);
}
50%{
    transform:scaleY(2);
}
100%{
    transform:scaleY(1);
}
`
const Line = styled.span`
background: ${props => props.theme.text};
border: 1px solid ${props => props.theme.body};

animation:${play} 1s ease infinite;
animation-play-state: ${props => props.$playing ? "running" : "paused"};
height: 1rem;
width: 2px;
margin:0 0.1rem
`

const SoundBar = () => {
    const { started, playing, toggle } = useMusic()

    const label = !started
        ? 'Music is off. Start it with the "click here" button on the home page'
        : playing
            ? 'Pause music'
            : 'Resume music'

    return (
        <Box
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            aria-pressed={started ? playing : undefined}
            aria-disabled={started ? undefined : 'true'}
            $playing={playing}
        >
            <Line $playing={playing} aria-hidden="true"/>
            <Line $playing={playing} aria-hidden="true"/>
            <Line $playing={playing} aria-hidden="true"/>
            <Line $playing={playing} aria-hidden="true"/>
            <Line $playing={playing} aria-hidden="true"/>
        </Box>
    )
}

export default SoundBar
