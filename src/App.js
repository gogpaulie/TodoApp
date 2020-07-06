import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
import './App.css';


class App extends React.Component {
  state = {
    todos: [
      {
        id: uuidv4(),
        title: 'Add items you want to get done!',
        completed: false
      }
    ]
  }



  // Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) })
  }

  // Delete Todo Item
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => 
      todo.id !== id
    )] });
    
  }

  // Add Todo
  addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false
    }
    if (title === '') {
      alert('Please enter text in todo list.')
    } else {
      this.setState({ todos: [...this.state.todos, newTodo] });
    }
    
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className='container'>
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos 
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} 
                />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />          
          </div>       
        </div>
      </Router>
    );
  }
}

export default App;
