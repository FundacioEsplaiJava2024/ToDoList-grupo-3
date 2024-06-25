import React, {useCallback} from "react";

interface DateToday{
}

const  DateToday:React.FC<DateToday>=()=>{
  const getDate = useCallback(()=>{
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();
    const dateFull = day+"/"+month+"/"+year;
    return dateFull;
    },[])
  

  return (
    <div>
      <h3>Today's Date</h3>
      <p>{getDate()}</p>
    </div>
  );
}

export default DateToday;


