import React, {Component} from 'react';
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
// import uuid from 'uuid'

import './App.css';

const uuid = require('uuid')

class App extends Component {

  state = {
    todos: [{
      id: 1,
      title: 'Take out the thrash',
      completed: false
    },{
      id: 2,
      title: 'Dinner with wifte',
      completed: false
    },{
      id: 3,
      title: 'Meeting with boss',
      completed: false
    }]
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
    this.setState({todos: this.state.todos.filter((todo) => { 
      return todo.id !== id
  })});
  }

  addTodo = (title) => {
    if (title !== '') {
      let newTodo = {
        id: uuid.v4(),
        title,
        completed: false
      }
      console.log(newTodo)
      this.setState({todos: [...this.state.todos, newTodo]})
    } else {
      alert('da scrie si tu ceva acolo nu ti fie lene')
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
            <AddTodo addTodo={this.addTodo}/>
            <Todos 
            todos={this.state.todos}
            markComplete = {this.markComplete}
            deleteTodo = {this.deleteTodo}
            />
        </div>
    </div>
    )
  }
}

export default App;
