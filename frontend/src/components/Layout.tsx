import {Container,Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

interface Props {
    children : JSX.Element
}

export const Layout:React.FC<Props> = ({children}) => {
    return (
        <Container>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Project</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to="/login">Login</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/members">Members</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/members/create">Members Create</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <a onClick={(e) => {
                            e.preventDefault();
                            localStorage.clear();
                            window.location.reload();
                        }}>Logout</a>
                    </Nav.Link>
                </Nav>
            </Navbar>
            <br/>
            {children}
        </Container>
    )
}