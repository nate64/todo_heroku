import React from 'react';
import { Form, Header, Container, List, Input, Segment } from 'semantic-ui-react';
import axios from 'axios';

const styles = {
  complete: { textDecoration: 'line-through', color: 'grey' }
}

class App extends React.Component {
  state = { name: '', todos: [] }

  componentDidMount() {
    axios.get('/api/todos')
      .then( ({ data: todos }) => this.setState({ todos }) )
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, todos } = this.state;
    axios.post('/api/todos', { name })
      .then( ({ data }) => {
        this.setState({ todos: [data, ...todos], name: '' })
      })
  }

  updateTodo = id => {
    axios.put(`/api/todos/${id}`)
      .then( ({ data }) => {
        const todos = this.state.todos.map( todo => {
          if (todo.id === id)
            return data
          return todo
        });

        this.setState({ todos });
      });
  }

  render() {
    const { name, todos } = this.state;
    return (
      <Container>
        <Segment textAlign="center">
          <Header as="h3" textAlign="center">Todo List</Header>
          <Form onSubmit={this.handleSubmit}>
            <Input 
              required
              value={name}
              onChange={ e => this.setState({ name: e.target.value }) }
            />
          </Form>
          <List>
            { todos.map( todo => 
                <List.Item 
                  key={todo.id}
                  style={ todo.complete ? styles.complete : {} }
                  onClick={ () => this.updateTodo(todo.id) }
                >
                  {todo.name}
                </List.Item> 
              )
            }
          </List>
        </Segment>
      </Container>
    );
  }
}

export default App;