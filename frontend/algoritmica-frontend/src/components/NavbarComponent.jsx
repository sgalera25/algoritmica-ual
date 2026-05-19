import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const NavbarComponent = () => {
    return (
        <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
            <Container>
                <Navbar.Brand as={Link} to='/'>Asignatura: Lógica y Algorítmica</Navbar.Brand>
                <Navbar.Toggle aria-controls='main-navbar' />
                <Navbar.Collapse id='main-navbar'>
                    <Nav className='ms-auto'>
                        <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
                        <Nav.Link as={Link} to='/dashboard'>Análisis</Nav.Link>
                        <Nav.Link as={Link} to='/algoritmospage'>Configuración</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;
