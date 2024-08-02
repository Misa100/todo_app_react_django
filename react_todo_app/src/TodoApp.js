import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoApp.css';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                const todosWithCheckState = response.data.map(todo => ({
                    ...todo,
                    isChecked: todo.completed // Initialise `isChecked` avec la valeur de `completed`
                }));
                setTodos(todosWithCheckState);
            })
            .catch(error => console.error('Erreur lors du chargement des todos:', error));
    }, []);

    const addTodo = () => {
        if (newTitle.trim() === '') return;
        axios.post('http://127.0.0.1:8000/api/todos/', { title: newTitle, completed: false })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Erreur lors de l\'ajout du todo:', error));
        setNewTitle('');
    };

    const deleteTodo = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('Erreur lors de la suppression du todo:', error));
    };

    const toggleTodo = (id, isChecked) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                const updatedTodo = { ...todo, isChecked: !isChecked };
                console.log(updatedTodo.isChecked)
                axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, {
                    title: updatedTodo.title,
                    completed: updatedTodo.isChecked
                })
                .then(response => {
                        // Mettez à jour l'état complet du todo après la réponse du serveur
                        return response.data;
                    })
                    .catch(error => console.error('Erreur lors de la mise à jour du todo:', error));
                return updatedTodo;
            }
            return todo;
        });
        setTodos(updatedTodos); // Mettre à jour l'état local
    };

    const handleEdit = (id, title) => {
        setEditingTodoId(id);
        setEditTitle(title);
    };

    const handleSave = (id) => {
        axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, { title: editTitle })
            .then(response => {
                setTodos(todos.map(todo => todo.id === id ? response.data : todo));
                setEditingTodoId(null);
                setEditTitle('');
            })
            .catch(error => console.error('Erreur lors de la mise à jour du titre:', error));
    };

    const handleKeyDown = (event, id) => {
        if (event.key === 'Enter') {
            handleSave(id);
        }
    };

    const [isChecked, setIsChecked] = useState(false); // État pour contrôler le checkbox

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        console.log(!isChecked);
    };

    return (
        <div className="todo-container">
            <h1 className="text-center todo-title">Your Todo List</h1>
            <div className="card todo-card">
                <div className="card-body">
                    <ul className="list-group mb-3">
                        {todos.map(todo => (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center todo-item">
                                <div className="d-flex align-items-center">
                                    {editingTodoId === todo.id ? (
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, todo.id)}
                                            onBlur={() => handleSave(todo.id)}
                                            className="form-control"
                                            autoFocus
                                        />
                                    ) : (
                                        <>
                                            <input
                                                type="checkbox"
                                                checked={todo.isChecked}
                                                onChange={() => toggleTodo(todo.id, todo.isChecked)}
                                                className="mr-3"
                                            />
                                            <span className = 'ms-3'
                                            onClick={() => handleEdit(todo.id, todo.title)}
                                            >
                                                {todo.title}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteTodo(todo.id)} aria-label="Delete todo">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            // value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            placeholder="Add a new task..."
                        />
                        <div className="input-group-append">
                            <button className="btn btn-pink" onClick={addTodo}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        {/* <div>
            <input
                type="checkbox"
                checked={isChecked}  // Contrôlé par l'état `isChecked`
                onChange={handleCheckboxChange}  // Appelle `handleCheckboxChange` lors du changement
            />
            <label className="ms-3">Checkbox</label>
        </div> */}
        </div>
    );
};

export default TodoApp;
