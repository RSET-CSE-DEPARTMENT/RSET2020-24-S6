import React from "react";
import Subject from "./Subject";

function Classes()
{
    const getSub = (data) =>{
        console.log(data)
}
return(
    <div>
        <Subject onSubmit={getSub}/>
    </div>
);
}
export default Classes;