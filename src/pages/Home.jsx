import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projectes'
import AnimatedTiles from '../components/AnimatedTiles.jsx';
import Footer from '../components/Footer.jsx';
import Contact from '../components/Contact.jsx';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            {/* <Projects /> */}
            <AnimatedTiles />
            <Footer />
            {/* <Contact /> */}

        </>
    )
}

export default Home