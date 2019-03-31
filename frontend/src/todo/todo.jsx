import React, { Component } from 'react';
import Axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos/';

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.handleChante = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPendding = this.handleMarkAsPendding.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.state = { description: '', list: [] }
        this.refresh();
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value })
    }


    handleAdd(){
        const description = this.state.description;
        Axios.post(URL, { description })
            .then( resp => this.refresh());
    }

    handleRemove(id){
        Axios.delete(`${URL}${id}`)
            .then(resp => this.refresh(this.state.description));
    }

    handleMarkAsDone(todo){
        Axios.put(`${URL}${todo._id}`,{...todo, done: true })
            .then( resp => this.refresh(this.state.description) );
    }

    handleMarkAsPendding(todo){
        Axios.put(`${URL}${todo._id}`,{...todo, done: false })
            .then( resp => this.refresh(this.state.description) );
    }

    handleSearch(){
        this.refresh(this.state.description);
    }

    handleClear(){
        this.refresh();
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : '';
        Axios.get(`${URL}?sort=-createdAt${search}`).then(resp => this.setState({...this.state, description, list: resp.data }));
    }
    
    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <TodoForm className='todoForm'
                    handleAdd={ this.handleAdd }
                    handleChange={ this.handleChante }
                    value= { this.state.description }
                    handleSearch={ this.handleSearch }
                    handleClear={ this.handleClear }
                />

                <TodoList 
                    list={ this.state.list }
                    handleRemove={ this.handleRemove }
                    handleMarkAsDone= { this.handleMarkAsDone }
                    handleMarkAsPendding={ this.handleMarkAsPendding }    
                />
            </div>
        )
    }
}