import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [], error: false, name: "" }
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    axios.get('https://rickandmortyapi.com/api/character/')
      .then((response) => {
        console.log(response.data.results);
        this.setState({ data: response.data.results, order: "" });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updateInputValue(e) {
    let name = e.target.name;
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      if (name === "order") {
        this.SortList();
      }
    });
  }

  searchByName = () => {
    let result = this.state.data.filter((obj) => {
      if (obj.name === this.state.name) {
        return true;
      }
      return false;
    })
    this.setState({ data: result });
  }

  SortList = () => {
    let list = this.state.data.slice();
    let sortData = list.sort((a, b) => {
      if (this.state.order === "desc") {
        return parseFloat(b.id) - parseFloat(a.id)
      } else {
        return parseFloat(a.id) - parseFloat(b.id)
      }

    });
    this.setState({ data: sortData });
  }

  componentDidCatch(error, info) {
    this.setState({ error: true });
  }

  render() {
    return (<Container style={{ backgroundColor: "white" }}>
      <Row>
        {this.LoadFilter()}
      </Row>
      <Row style={{ backgroundColor: "black" }}>
        {this.LoadUi(this.state.data)}
      </Row>
    </Container>);
  }

  LoadUi = (data) => {
    return (<>
      {data.map((obj, index) => {
        return (
          <Col xs={6} md={3} key={obj.id}>
            <Card style={{ width: '18rem', padding: "5px", color: "white", backgroundColor: "black" }}>
              <Card.Img variant="top" src={obj.image} />
              <Card.Body>
                <Card.Title>{obj.name}</Card.Title>
                <ListGroup className="list-group-flush" style={{ color: "white", backgroundColor: "black" }}>
                  <ListGroupItem style={{ color: "white", backgroundColor: "black" }}>Status {obj.status}</ListGroupItem>
                  <ListGroupItem style={{ color: "white", backgroundColor: "black" }}>Species {obj.species}</ListGroupItem>
                  <ListGroupItem style={{ color: "white", backgroundColor: "black" }}>Gender {obj.gender}</ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card></Col>)
      })}
    </>)
  };


  LoadFilter = () => {
    return (
      <>
        <Col xs={6} md={12}>
          <Row>
            <Col xs={12} md={12}>
              <Form.Group controlId="exampleForm.ControlInput1" style={{ float: "left", display: "inline-block" }}>
                <Form.Label>Search by Name</Form.Label>
                <Row>
                  <Col xs={8} md={6}>
                    <Form.Control type="text" name="name" value={this.state.name} onChange={evt => this.updateInputValue(evt)} />
                  </Col>
                  <Col xs={4} md={6}>
                    <Button variant="primary" onClick={this.searchByName}>Search</Button>
                  </Col>
                </Row>


              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="exampleForm.ControlInput1" style={{ width: "100%", float: "right" }}>
                <Form.Label>Sort by ID</Form.Label>
                <Form.Control as="select" name="order" onChange={evt => this.updateInputValue(evt)}>
                  <option>Sort by ID</option>
                  <option value="asc">ASC</option>
                  <option value="desc">Desc</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </>
    )
  }

}

export default App;
