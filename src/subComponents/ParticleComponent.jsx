import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import ConfigDark from "../config/particlesjs-config.json";
import ConfigLight from "../config/particlesjs-config-light.json";

const Box = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`;

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () => (props.theme === "light" ? ConfigLight : ConfigDark),
    [props.theme]
  );

  if (!init) return <Box />;

  return (
    <Box>
      <Particles
        id="tsparticles"
        style={{ position: "absolute", top: 0 }}
        options={options}
      />
    </Box>
  );
};

export default ParticlesComponent;
