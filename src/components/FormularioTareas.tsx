import React, {useState} from "react";

interface PropsFormularioTareas{
    onAddTarea: (texto:string)=> void;
}

const FormularioTareas:React.FC<PropsFormularioTareas>=({onAddTarea})=>{
    const[tarea, setTarea]=useState('');

    const handleSubmit=(evento:React.FormEvent<HTMLFormElement>)=>{
        evento.preventDefault();
        if(tarea.trim()!= ''){
            onAddTarea(tarea);
            setTarea('');
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={tarea}
            onChange={(evento)=>setTarea(evento.target.value)}
            placeholder="Agregar una nueva tarea"
            />
            <button type="submit">Agregar Tarea</button>
            </form>
    );
};
export default FormularioTareas;