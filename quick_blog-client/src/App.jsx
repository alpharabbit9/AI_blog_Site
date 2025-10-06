import Lenis from 'lenis'
import { useEffect } from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast';

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

      <Toaster/>

    </>
  )
}

export default App