import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./components/Themes";
import { AnimatePresence, MotionConfig } from "motion/react";
import GlobalStyle from "./globalStyles";

//Components
import Main from "./components/Main";
import AboutPage from "./components/AboutPage";
import BlogPage from "./components/BlogPage";
import WorkPage from "./components/WorkPage";
import MySkillsPage from "./components/MySkillsPage";
import SayHiPage from "./components/SayHiPage";
import SoundBar from "./subComponents/SoundBar";
import PageTransition from "./subComponents/PageTransition";

const page = (el) => <PageTransition>{el}</PageTransition>;

function App() {
  const location = useLocation();
  return (
    // reducedMotion="user": Motion drops transform animations for
    // visitors who ask their OS for reduced motion.
    <MotionConfig reducedMotion="user">
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>
        <SoundBar />

        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={page(<Main />)} />
            <Route path="/about" element={page(<AboutPage />)} />
            <Route path="/blog" element={page(<BlogPage />)} />
            <Route path="/projects" element={page(<WorkPage />)} />
            <Route path="/say-hi" element={page(<SayHiPage />)} />
            {/* Old links keep working */}
            <Route path="/work" element={<Navigate to="/projects" replace />} />
            <Route path="/contact" element={<Navigate to="/say-hi" replace />} />
            <Route path="/skills" element={page(<MySkillsPage />)} />
            {/* Catch-all: send unknown routes to Main */}
            <Route path="*" element={page(<Main />)} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
