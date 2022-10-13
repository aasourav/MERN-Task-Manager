
export default function Button({btnName,name,handleClick}){
    return(
        <button onClick={handleClick} name={name}>{btnName}</button>
    )
}