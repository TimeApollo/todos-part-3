import React, { Component } from 'react';
import { TodoItem } from './TodoItem'

export class TodoList extends Component {
  
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