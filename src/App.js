import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';
import { TodoList } from './TodoList';
import { Link, Route, Switch } from 'react-router-dom'

class App extends Component {
  state = {
    todos: todoList,
    currentID: todoList.length,
  }

  inputText = (event) => {
    if (event.keyCode === 13){
      const newID = this.state.currentID + 1;
      let newEntry = {
        "userId": 1,
        "id": newID,
        "title": event.target.value,
        "completed": false
      }

      this.setState({
        todos: this.state.todos.concat(newEntry),
        currentID: newID         
      });
      event.target.value = '';
    }
  }

  toggleCheck = (event) => {
    let newTodos = this.state.todos.slice();
    let index = newTodos.findIndex( todo => todo.id === Number(event.target.name) )
    newTodos[index].completed = !newTodos[index].completed;
    this.setState({todos: newTodos})
  }

  deleteOne = (event) => {
    let newTodos = this.state.todos.filter( todo => todo.id !== Number(event.target.name))
    this.setState({todos: newTodos})
  }

  deleteAll = (event) => {
    let newTodos = this.state.todos.filter( todo => todo.completed === false);
    this.setState({todos: newTodos})
  }

  allTodos = () => {
    return (
      <TodoList 
        todos={this.state.todos}
        toggleCheck={this.toggleCheck}
        deleteOne={this.deleteOne}
      />
    )
  }

  activeTodos = () => {
    let active = this.state.todos.filter( todo => todo.completed === false );
    return (
      <TodoList 
        todos={active}
        toggleCheck={this.toggleCheck}
        deleteOne={this.deleteOne}
      />
    )
  }

  completedTodos = () => {
    let completed = this.state.todos.filter( todo => todo.completed === true );
    return (
      <TodoList 
        todos={completed}
        toggleCheck={this.toggleCheck}
        deleteOne={this.deleteOne}
      />
    )
  }

  render() {
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input 
            type='text' 
            className='new-todo' 
            placeholder='What needs to be done?'
            onKeyDown={this.inputText}
            autoFocus
          />
        </header>
        <section className='main'>
          <Switch>
            <Route exact path='/' component={this.allTodos}/>
            <Route path='/active' component={this.activeTodos}/>
            <Route path='/completed' component={this.completedTodos}/>
          </Switch>
        </section>
        <footer className="footer">
				  <span className="todo-count"><strong>0</strong> item(s) left</span>
          <ul className="filters">
           <li>
            <Link to="/">
            All
            </Link>
           </li>
           <li>
            <Link to="/active">
             Active
            </Link>
           </li>
           <li>
            <Link to="/completed">
             Completed
            </Link>
           </li>
          </ul>
				  <button className="clear-completed" onClick={this.deleteAll}>Clear completed</button>
			  </footer>
      </section>
    );
  }
}

export default App;
