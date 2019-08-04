import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap';

export default class crearUsuario extends Component {

    state = {
        usuarios: [],
        nombreUsuario: ""
    }

    async componentDidMount(){
        this.obtenerUsuarios();
    }

    obtenerUsuarios = async () => {
        let listaUsuarios = await fetch('http://localhost:4000/api/usuarios');
        let res = await listaUsuarios.json()
        this.setState({usuarios: res});
    }

    onchangeUserName = async (e) => {
        this.setState({nombreUsuario: e.target.value});
    }

    render() {
        return (
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h3>Crear nuevo usuario</h3>
                            <form>
                                <div className="form-group" >
                                    <input type="text" className="form-control" onChange={this.onchangeUserName} />
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <ul className="list-group">
                        {
                            this.state.usuarios.map(usuario =>
                                <li className="list-group-item list-group-item-action" key={usuario._id}>
                                    {usuario.nombre}
                                </li>
                            )
                        }
                    </ul>
                </Col>
            </Row>
        )
    }
}
