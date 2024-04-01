import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export function Navigaton({ navKey, setNavKey }) {
  return (
    <Navbar
      expand="sm"
      className="bg-body-tertiary mb-2"
      sticky="top"
      data-bs-theme="dark"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand>Flash Cards</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            value={navKey}
            className="me-auto"
            onSelect={(e) => setNavKey(e)}
          >
            <Nav.Item>
              <Nav.Link eventKey="math">Mathematics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="flags">Flags</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
