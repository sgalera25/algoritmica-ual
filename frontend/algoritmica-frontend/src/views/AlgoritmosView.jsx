import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavbarComponent from '../components/NavbarComponent'
import AlgoritmosPage from './AlgoritmosPage'

const AlgoritmosView = () => {
  return (
    <>
      <NavbarComponent />
      <Container className='my-5'>
        <AlgoritmosPage />
      </Container>
      <Footer />
    </>
  )
}

export default AlgoritmosView