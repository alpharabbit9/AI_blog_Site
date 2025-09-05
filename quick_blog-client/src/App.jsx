import Lenis from 'lenis'
import { useEffect } from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {

  useEffect(() => {

    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  })
  return (
    <>

      <div >


        <header>

          <Navbar />

        </header>

        <main>
          
          <Outlet/>

        </main>


        <footer>

          <Footer/>

        </footer>

      </div>

    </>
  )
}

export default App