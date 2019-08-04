import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class navbar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="container">
                <Link className="navbar-brand" to="/">PlacasApp</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Link className="nav-link" to="/crearUsuario">Crear Usuario</Link>
                    <Link className="nav-link" to="/crearPlaca">Crear Placa</Link>
                    <Link className="nav-link" to="/">Placas</Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.3">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Link className="nav-link" to="/crearUsuario">Nombre perfil</Link>
                    <Link className="nav-link" to="/">Cerarr session</Link>
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}
