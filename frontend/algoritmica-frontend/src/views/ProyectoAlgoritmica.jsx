import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import NavbarComponent from '../components/NavbarComponent'
import DashboardExecutions from '../components/DashboardExecutions'

const ProyectoAlgoritmica = () => {
  return (
    <>
      <NavbarComponent />
      <Container className='my-5'>
        <DashboardExecutions />
      </Container>
      <Footer />
    </>
  )
}

export default ProyectoAlgoritmica