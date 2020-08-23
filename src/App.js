import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import Axios from 'axios'

import './App.css';

const uuid = require('uuid')

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount () {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => {
          this.setState({todos: response.data})
      })
  }

  // Toggle complete
  markComplete = (id) => {
    this.setState( {todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })} )
}
  // Delete item
  deleteTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        this.setState({todos: this.state.todos.filter((todo) => { 
          return todo.id !== id
      })});
      })
  }

  addTodo = (title) => {
    if (title !== '') {
      // let newTodo = {
      //   id: uuid.v4(),
      //   title,
      //   completed: false
      // }
      Axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: title,
        completed: false
      })
      .then(response => {
        let newTodo = {
          id: uuid.v4(),
          title: response.data.title,
          completed: false
        }
        
        this.setState({todos: [...this.state.todos, newTodo]})
      })
    } else {
      alert('da scrie si tu ceva acolo nu ti fie lene')
    }
  }

  render() {
    return (
      <Router>
          <div className="App">
            <div className="container">
              <Header />
                <Route exact path='' render={props => (
                  <React.Fragment>
                    <AddTodo addTodo={this.addTodo}/>
                    <Todos 
                    todos={this.state.todos}
                    markComplete = {this.markComplete}
                    deleteTodo = {this.deleteTodo}
                    />
                  </React.Fragment>
                )} />
                <Route path='/about' component={About} />
            </div>
        </div>
      </Router>
    )
  }
}

export default App;
