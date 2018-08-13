import React, { Component } from 'react';

export class TodoItem extends Component {
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