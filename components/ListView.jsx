import { useState, useRef, useEffect } from 'react';

import { nanoid } from 'nanoid';
import ListGroup from 'react-bootstrap/ListGroup';

import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export const ListView = (props) => {
    const [tasks, setTasks] = useState(props.todoListData);

    const handleDeleteTask = async (id) => {
        const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        const data = await response.json();
        console.log(data)
        if (data.success) {
            const remainingTasks = tasks.filter((task) => id !== task.id);
            console.log(remainingTasks);
            setTasks(remainingTasks);
        }
    };

    const handleCompleteTask = async (id) => {
        const updatedTask = tasks.find((task) => id === task.id);
        updatedTask.completed = !updatedTask.completed;
        const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
        });
        const data = await response.json();
        if (data.success) {
            const updatedTasks = tasks.map((task) => {
                if (id === task.id) {
                    return updatedTask;
                }
                return task;
            });
            setTasks(updatedTasks);
        }
    };

    const handleEditTask = async (id, newName) => {
        const updatedTask = tasks.find((task) => id === task.id);
        updatedTask.name = newName;

        const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
        });
        const data = await response.json();
        if (data.success) {
            const updatedTasks = tasks.map((task) => {
                if (id === task.id) {
                    return updatedTask;
                }
                return task;
            });
            setTasks(updatedTasks);
        }
    };

    const taskList = tasks.map((task) => (
        <TodoItem
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            completeTask={handleCompleteTask}
            deleteTask={handleDeleteTask}
            editTask={handleEditTask}
        />
    ));

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    const handleAddTask = async (name) => {
        const newTask = {
            // owner: account.idTokenClaims?.oid,
            id: nanoid(),
            name: name,
            completed: false,
        };

        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(newTask),
        });

        const data = await response.json();
        if (data.success) {
            setTasks([...tasks, newTask]);
        }
    };

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);
    return (
        <div className="data-area-div">
            <TodoForm addTask={handleAddTask} />
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}></h2>
            <ListGroup className="todo-list">{taskList}</ListGroup>
        </div>
    );
};
