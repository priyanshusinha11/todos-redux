import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

function TodoItem({ todo }) {
    const [editMode, setEditMode] = useState(false);
    const [updatedText, setUpdatedText] = useState(todo.text);
    const dispatch = useDispatch();
    const handleUpdateSubmit = () => {
        dispatch(updateTodo({ id: todo.id, text: updatedText }));
        setEditMode(false);
    };

    return (
        <>
            {editMode ? (
                <form onSubmit={handleUpdateSubmit}>
                    <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        autoFocus
                    />
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div className='text-white'>
                    {todo.text}
                    <button
                        onClick={() => setEditMode(true)}
                        className="ml-4 text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                    >
                        Edit
                    </button>
                </div>
            )}
            <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md ml-4"
            >
                Delete
            </button>
        </>
    );
}

function Todos() {
    const todos = useSelector(state => state.todos);
    //const dispatch = useDispatch();

    return (
        <>
            <ul className="list-none">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </>
    );
}

export default Todos;
