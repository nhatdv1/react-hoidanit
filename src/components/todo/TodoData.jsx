const TodoData = (props) => {
    console.log("Props received in TodoData:", props);
    return (
        <div className='todo-data'>
            {props.todoList.map((item) => (
                <div key={item.id}>{item.title}</div>
            ))}
        </div>
    );
}

export default TodoData