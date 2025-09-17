import { useEffect } from 'react';
import Hero from "../sections/home/Hero"
import Skills from "../sections/home/Skills"
import Projects from "../sections/home/Projects"
import Timeline from "../sections/home/Timeline"
import Education from "../sections/home/Education"
import Contact from "../sections/home/Contact"

const Home = () => {
    useEffect(() => {
        document.title = "peaceoutommy - Portfolio";
    }, []);

    return (
        <main role="main" id="main-content">
            <Hero />
            <Projects />
            <Skills />
            <Timeline />
            <Education />
            <Contact />
        </main>
    )
}

export default Home