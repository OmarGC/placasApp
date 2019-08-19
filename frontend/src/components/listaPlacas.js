import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'

export default class listaPlacas extends Component {
    state = {
        placas: []
    }

    componentDidMount() {
      this.obtenerPlacas();
    }

    async obtenerPlacas() {
        let listaUsuarios = await fetch('http://localhost:4000/api/placas');
        let res = await listaUsuarios.json()
        this.setState({ placas: res });
    } 

    async deletePlaca(id) {
        console.log(id)
      await fetch('http://localhost:4000/api/placas/' + id, {
        method: 'DELETE', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      });
      this.obtenerPlacas();  
    }

    render() {
        return (
            
            <Row>
              {
                  this.state.placas.map(placa => (
                    <Col md={4} className="p-2" key={placa._id}>
                        <Card>
                          <Card.Header className="d-flex justify-content-between">
                              <h5> { placa.nombre } </h5>
                              <Link className="btn btn-primary" to={"/editar/" + placa._id}>
                                Edit
                              </Link>
                              
                          </Card.Header>
                          <Card.Body>
                            <p> { placa.idUsuario.nombre } </p>
                            <p> { placa.modelo } </p>
                            <p> { format(placa.fecha) } </p>
                          </Card.Body>
                          <Card.Footer>
                              <Button variant="danger" onClick={() => this.deletePlaca(placa._id)}>
                                Eliminar
                              </Button>
                          </Card.Footer>
                        </Card>
                    </Col>
                  ))
              }
            </Row>

        )
    }
}
