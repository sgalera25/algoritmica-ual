import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavbarComponent from '../components/NavbarComponent'
import Home from '../components/Home'

const MainHome = () => {
  return (
    <>
      <NavbarComponent />
      <Container className='my-5'>
        <Home />
      </Container>
      <Footer />
    </>
  )
}

export default MainHome