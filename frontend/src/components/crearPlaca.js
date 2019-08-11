import React, { Component } from 'react'
import { Button, Form, Row, Col, Card } from 'react-bootstrap';

export default class crearPlaca extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userSelected: '',
            name: '',
            model: '',
            validationError: '',

            formValid: false,
            formErrors: { userSelected: '', name: '', model: '' },

            userSelectedValid: false,
            nameValid: false,
            modelValid: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
      this.getUsers();
    }

    async getUsers() {
      let listaUsuarios = await fetch('http://localhost:4000/api/usuarios');
      let res = await listaUsuarios.json();
      let users = res.map(user => {return  {value: user._id, display: user.nombre}})
      this.setState({ users: [{value: '', display: 'Selecciona una opcion..'}].concat(users) })    
    }

    handleInputChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) } )
        console.log(name)
    }

    onSubmit(e) {
      e.preventDefault();
    }

    validateForm() {
        this.setState({ formValid: this.state.userSelectedValid && this.state.nameValid && this.state.modelValid });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let userSelectedValid = this.state.userSelectedValid;
        let nameValid = this.state.nameValid;
        let modelValid = this.state.modelValid;
    
        switch(fieldName) {
          case 'userSelected':
            userSelectedValid = value 
            fieldValidationErrors.userSelected = userSelectedValid === "" ? "Tiene que seleccionar una opcion!" : "" 
            break;
          case 'name':
            let regexName = new RegExp(/^[a-zA-Z áéíóúAÉÍÓÚÑñ]+$/);
            nameValid = regexName.test(value);
            fieldValidationErrors.name = nameValid ? '' : 'El nombre no debe tener numeros, ni caracteres especiales.';
            break;
          case 'model':
            let regexModel = new RegExp(/^[a-zA-Z áéíóúAÉÍÓÚÑñ]+$/);
            modelValid = regexModel.test(value);
            fieldValidationErrors.model = modelValid ? '': 'error!';
            // telefonoValid = value.length >= 10;
            // fieldValidationErrors.telefono = telefonoValid ? '': ' is to short';
            break;
          
          default:
            break;
        }
        this.setState(
            {
              formErrors: fieldValidationErrors,
              userSelectedValid: userSelectedValid,
              nameValid: nameValid,
              modelValid: modelValid,
            },
            this.validateForm
        );
    }


    render() {
        return (
            <Row>
              <Col md={6} className="offset-md-3">
                <Card>
                  <Card.Body>
                    <h4>Crea una nueva placa</h4>
                    <Form onSubmit={this.onSubmit}>
                      {/* Select user */}
                      <div className="form-group">
                         <label htmlFor="user">Usuario:</label>
                          <select id="user"
                            className="form-control"
                            name="userSelected"
                            onChange={this.handleInputChange}
                          >
                            {
                              this.state.users.map(user => (
                              <option
                                key={ user.value }
                                value={ user.value}
                              >
                                { user.display }
                              </option>
                            ))
                            }

                          </select>
                          <small style={{color: 'red', marginTop: '5px'}}>
                            {this.state.formErrors.userSelected}
                          </small>
                      </div>
                      <div className="form-group">
                          <label htmlFor="name">Nombre: </label>
                          <input 
                            id="name"
                            name="name"
                            placeholder="¿Para que se usa esta placa?"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                          />
                          <small style={{color: 'red', marginTop: '5px'}}>
                            {this.state.formErrors.name}
                          </small>
                      </div>
                      <div className="form-group">
                          <label htmlFor="model">Modelo: </label>
                          <input 
                            id="model"
                            name="model"
                            placeholder="¿Qué modelo de placa tienes?"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.model}
                          />
                          <small style={{color: 'red', marginTop: '5px'}}>
                            {this.state.formErrors.model}
                          </small>
                      </div>
                      <br />
                      <Button type="submit" variant="outline-success" disabled={ !this.state.formValid }>Guardar usuario</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        )
    }
}
