import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';

export default class crearUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
          usuarios: [],
          nameUser: "",
          email: "",
          telefono: "",
          password: "",

          formValid: false,
          formErrors: { nameUser: '', email: '', telefono: '', password: '' },
          
          nameUserValid: false,
          emailValid: false,
          telefonoValid: false,
          passwordValid: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    

    async componentDidMount(){
        this.obtenerUsuarios();
    }

    obtenerUsuarios = async () => {
        let listaUsuarios = await fetch('http://localhost:4000/api/usuarios');
        let res = await listaUsuarios.json()
        this.setState({usuarios: res});
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState( { [name]: value }, () => { this.validateField(name, value) } );
    }

    onSubmit = async (e) => {
        e.preventDefault();
        let data = { nombre: this.state.nameUser, correo: this.state.email, clave: this.state.password, telefono: this.state.telefono };
        await fetch('http://localhost:4000/api/usuarios/add', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        });
        this.setState({ nameUser: '' });
        this.setState({ email: '' });
        this.setState({ password: '' });
        this.setState({ telefono: '' });
        this.setState({ password: ''});
        this.obtenerUsuarios();
    }

    async deleteUser(_id) {
      console.log(_id);
      await fetch('http://localhost:4000/api/usuarios/' + _id, {
        method: 'DELETE', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      });
      this.obtenerUsuarios();    
    }

    validateForm() {
        this.setState({ formValid: this.state.nameUserValid && this.state.emailValid && this.state.telefonoValid && this.state.passwordValid });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameUserValid = this.state.nameUserValid;
        let emailValid = this.state.emailValid;
        let telefonoValid = this.state.telefonoValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
          case 'nameUser':
            let regexUser = new RegExp("^[a-zA-Z áéíóúAÉÍÓÚÑñ]+$");
            nameUserValid = regexUser.test(value);
            fieldValidationErrors.nameUser = nameUserValid ? '': ' is invalid';
            break;
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'telefono':
            let regexTel = new RegExp("^[0-9]+$")
            telefonoValid = regexTel.test(value);
            fieldValidationErrors.telefono = telefonoValid ? '': ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState(
            {
              formErrors: fieldValidationErrors,
              nameUserValid: nameUserValid,
              emailValid: emailValid,
              telefonoValid: telefonoValid
            },
            this.validateForm
        );
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    onlyNumbers(e) {
      let key = window.event ? e.which : e.keyCode;
      if (key < 48 || key > 57) {
        e.preventDefault();
      }
    }

    disableEnter(e) {
      let key = window.event ? e.which : e.keyCode;
      if ( key === 13) {
        e.preventDefault();
      }
    }

    render() {
        return (
            <Row>
                <Col md={5}>
                    <Card className="mb-5">
                        <Card.Body>
                            <h3>Crear nuevo usuario</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group" >
                                    <label htmlFor="nameUser">Nombre:</label>
                                    <input type="text"
                                      name="nameUser"
                                      className="form-control"
                                      maxLength="30"
                                      value={this.state.nameUser}
                                      onKeyDown={this.disableEnter}
                                      onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="email">Correo: </label>
                                    <input type="email"
                                      name="email"
                                      className="form-control"
                                      value={this.state.email}
                                      onKeyDown={this.disableEnter}
                                      onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group" >
                                   <label htmlFor="telefono">telefono: </label>
                                    <input type="tel" 
                                      name="telefono"
                                      className="form-control"
                                      maxLength="10"
                                      value={this.state.telefono} 
                                      onKeyPress={this.onlyNumbers}
                                      onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                    <label htmlFor="password">Clave: </label>
                                    <input type="password"
                                      name="password"
                                      className="form-control"
                                      minLength="6"
                                      value={this.state.password}
                                      onKeyDown={this.disableEnter}
                                      onChange={this.handleInputChange} />
                                </div>

                                <Button type="submit" variant="outline-success">Guardar usuario</Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={7}>
                    <ul className="list-group">
                        {
                            this.state.usuarios.map(usuario =>
                                <li
                                  className="list-group-item list-group-item-action"
                                  key={usuario._id}
                                  onDoubleClick={() => this.deleteUser(usuario._id)}
                                >
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
