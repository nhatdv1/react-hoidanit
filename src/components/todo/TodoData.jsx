const TodoData = (props) => {
    const { todoList, deleteItem } = props;

    return (
        <div className='todo-data'>
            {todoList.map((item) => {
                return (
                    (
                        <div className="todo-item" key={item.id}>
                            <div key={item.id}>{item.title}</div>
                            <button onClick={() => deleteItem(item.id)}>Delete</button>
                        </div>

                    )
                )
            })}
        </div>
    );
}

export default TodoData