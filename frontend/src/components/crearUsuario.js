import React, { Component } from 'react'
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

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
        this.onSubmit = this.onSubmit.bind(this);
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

    clearInputs() {
      this.setState({ nameUser: '' });
      this.setState({ email: '' });
      this.setState({ password: '' });
      this.setState({ telefono: '' });
      this.setState({ password: ''});
      this.setState({ formValid: false })
      this.setState({ nameUserValid: false });
      this.setState({ emailValid: false });
      this.setState({ telefonoValid: false });
      this.setState({ passwordValid: false });
    }

    async onSubmit(e) {
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
        this.clearInputs();
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
            let regexUser = new RegExp(/^[a-zA-Z áéíóúAÉÍÓÚÑñ]+$/);
            nameUserValid = regexUser.test(value);
            fieldValidationErrors.nameUser = nameUserValid ? '': 'El nombre no debe tener numeros, ni caracteres especiales.';
            break;
          case 'email':
            let regexEmail = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            emailValid = regexEmail.test(value);
            fieldValidationErrors.email = emailValid ? '' : 'El correo electronico no es valido';
            break;
          case 'telefono':
            let regexTel = new RegExp(/^([0-9]{10})+$/)
            telefonoValid = regexTel.test(value);
            fieldValidationErrors.telefono = telefonoValid ? '': 'El numero de telefono no tiene que contener mas de 10 digitos y no se aceptan letras';
            // telefonoValid = value.length >= 10;
            // fieldValidationErrors.telefono = telefonoValid ? '': ' is to short';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': 'La contraseña debe tiener mas de 6 caracteres';
            break;
          default:
            break;
        }
        this.setState(
            {
              formErrors: fieldValidationErrors,
              nameUserValid: nameUserValid,
              emailValid: emailValid,
              telefonoValid: telefonoValid,
              passwordValid: passwordValid
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

    onlyLetters(e) {
      let key = window.event ? e.which : e.keyCode;
      let keyboardKey = String.fromCharCode(key).toLowerCase();
      let letters = " áéíóúabcdefghijklmnñopqrstuvwxyz";
      let specials = "8-37-39-46";
      let specialKey = false;
      for(var i in specials){
        if(key === specials[i]){
            specialKey = true;
            break;
        }
      }

      if(letters.indexOf(keyboardKey)===-1 && !specialKey){
        e.preventDefault();
      }
    }

    disableEnter(e) {
      let key = window.event ? e.which : e.keyCode;
      if ( key === 13) {
        e.preventDefault();
      }
    }

    notCopyAndPaste(e) {
      e.preventDefault();
      alert("Not Copy!");
    }

    render() {
      
        return (
            <Row>
                <Col md={5}>
                    <Card className="mb-5">
                        <Card.Body>
                            <h3>Crear nuevo usuario</h3>
                            <Form onSubmit={this.onSubmit}>
                                <div className="form-group" >
                                    <label htmlFor="nameUser">Nombre completo:</label>
                                    <input type="text" id="nameUser"
                                      name="nameUser"
                                      className="form-control"
                                      maxLength="30"
                                      value={this.state.nameUser}
                                      onPaste={this.notCopyAndPaste}
                                      onKeyPress={this.onlyLetters}
                                      onKeyDown={this.disableEnter}
                                      onChange={this.handleInputChange}
                                    />
                                    <small className="form-text" style={{color: 'red'}}>
                                      {this.state.formErrors.nameUser}
                                    </small>
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="email">Correo: </label>
                                    <input type="email" id="email"
                                      name="email"
                                      className="form-control"
                                      value={this.state.email}
                                      onPaste={this.notCopyAndPaste}
                                      onKeyDown={this.disableEnter}
                                      onChange={this.handleInputChange}
                                    />
                                    <small className="form-text" style={{color: 'red'}}>
                                      {this.state.formErrors.email}
                                    </small>
                                </div>
                                <div className="form-group" >
                                   <label htmlFor="telefono">Telefono celular: </label>
                                    <input type="tel" id="telefono"
                                      name="telefono"
                                      className="form-control"
                                      minLength="10"
                                      maxLength="15"
                                      onPaste={this.notCopyAndPaste}
                                      value={this.state.telefono} 
                                      onKeyPress={this.onlyNumbers}
                                      onChange={this.handleInputChange}
                                    />
                                    <small className="form-text" style={{color: 'red'}}>{ this.state.formErrors.telefono }</small>
                                </div>
                                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                    <label htmlFor="password">Contraseña: </label>
                                    <input type="password" id="password"
                                      name="password"
                                      className="form-control"
                                      minLength="6"
                                      value={this.state.password}                                      
                                      onCopy={this.notCopyAndPaste}
                                      onPaste={this.notCopyAndPaste}
                                      onKeyDown={this.disableEnter}
                                      onChange={this.handleInputChange}
                                    />
                                    <small className="form-text" style={{color: 'red'}}>{ this.state.formErrors.password }</small>
                                    
                                </div>

                                <Button type="submit" variant="outline-success" disabled={!this.state.formValid}>Guardar usuario</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <p>{JSON.stringify(this.state.formErrors)}</p>
                    <p>Valid: {JSON.stringify(this.state.formValid)}</p>
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
