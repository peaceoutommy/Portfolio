import Hero from "../sections/home/hero"
import Skills from "../sections/home/Skills"
import Projects from "../sections/home/Projects"
import Timeline from "../sections/home/Timeline"
import Education from "../sections/home/Education"
import Contact from "../sections/home/Contact"

const Home = () => {
    return (
        <main role="main" id="main-content">
            <Hero />
            <Skills />
            <Projects />
            <Timeline />
            <Education />
            <Contact />
        </main>
    )
}

export default Home