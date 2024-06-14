import React, {useState} from "react";

interface TodoForm{
    onAddTarea: (texto:string)=> void;
}

const TodoForm:React.FC<TodoForm>=({onAddTarea})=>{
    const[tarea, setTarea]=useState('');

    const handleSubmit=(evento:React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault();
            onAddTarea(tarea);
            setTarea('');
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text" value={tarea}
            onChange={(evento)=>setTarea(evento.target.value)}
            placeholder="Agregar una nueva tarea"
            />
            <button type="submit">Agregar Tarea</button>
            </form>
    );
};
export default TodoForm;