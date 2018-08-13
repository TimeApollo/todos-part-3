import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';

class TodoItem extends Component {
  render(){
    return (
      <li className={this.props.value}>
        <div className='view'>
          <input
            name={this.props.id} 
            className='toggle' 
            type='checkbox' 
            checked={this.props.completed} 
            onChange={this.props.toggleCheck}
          />
          <label>{this.props.title}</label>
          <button 
            className="destroy" 
            name={this.props.id}
            onClick={this.props.deleteOne}
          />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  
  render(){
    return(
      <ul className='todo-list'>
        {this.props.todos.map( todo => {
          if ( todo.completed ){
            return(
              <TodoItem 
                value='completed' completed={todo.completed} 
                title={todo.title} key={todo.id}
                toggleCheck={this.props.toggleCheck}
                id={todo.id} deleteOne={this.props.deleteOne}
              />
            )
          }else{
            return(
              <TodoItem 
                value='' completed={todo.completed} 
                title={todo.title} key={todo.id}
                toggleCheck={this.props.toggleCheck}
                id={todo.id} deleteOne={this.props.deleteOne}
             />
            )
          }
        })}
      </ul>
    )
  }
}

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
          <TodoList 
            todos={this.state.todos}
            toggleCheck={this.toggleCheck}
            deleteOne={this.deleteOne}
          />
        </section>
        <footer className="footer">
				  <span className="todo-count"><strong>0</strong> item(s) left</span>
				  <button className="clear-completed" onClick={this.deleteAll}>Clear completed</button>
			  </footer>
      </section>
    );
  }
}

export default App;
