import React from 'react';

const TodoItem = ({ todo, isEditing, editTitle, onEdit, onSave, onDelete, onToggle, setEditTitle, handleKeyDown }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center todo-item">
            <div className="d-flex align-items-center">
                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, todo.id)}
                        onBlur={() => onSave(todo.id)}
                        className="form-control"
                        autoFocus
                    />
                ) : (
                    <>
                        <input
                            type="checkbox"
                            checked={todo.isChecked}
                            onChange={() => onToggle(todo.id, todo.isChecked)}
                            className="mr-3"
                        />
                        <span
                            className='ms-3'
                            onClick={() => onEdit(todo.id, todo.title)}
                        >
                            {todo.title}
                        </span>
                    </>
                )}
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(todo.id)} aria-label="Delete todo">
                <span aria-hidden="true">&times;</span>
            </button>
        </li>
    );
};

export default TodoItem;
