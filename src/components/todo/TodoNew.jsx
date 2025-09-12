import React, { useState } from 'react';

const TodoNew = (props) => {

    const [valueInput, setValueInput] = useState('eric')

    const handleClick = () => {
        props.setTodoList(prev => [...prev, { id: Math.floor(Math.random() * 1000), title: valueInput }])
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }

    return (
        <div div className='todo-new'>
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} />
            <button onClick={handleClick}>Add</button>
            <div>{valueInput}</div>
        </div>

    );
}

export default TodoNew