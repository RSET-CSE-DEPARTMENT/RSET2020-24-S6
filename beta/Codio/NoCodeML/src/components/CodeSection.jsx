const CodeSection=({imports,code}) =>{
       console.log(imports)
   return(
    
    <div className='code_area card2 flex flex-col border-2 background-color1 gap-1 m-12 p-5'>
        <div className='flex flex-col p-2 rounded-lg gap-1 interior'>
        <div className='flex flex-col self-start '>
              {imports.split('\n').map(str => <p className='self-start'>{str}</p>)}                
         </div>
         <p className='flex flex-col self-start '>
              {code.split('\n').map(str => <p className='self-start'>{str}</p>)}
         </p>
         </div>
    </div>

   )
}
export default CodeSection