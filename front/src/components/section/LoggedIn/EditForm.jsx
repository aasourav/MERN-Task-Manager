
export default function EditForm({id,handleEditSubmit,editChange,Value}){
    // const [Value,setData] = useState({
    //     taskname:'',
    //     taskdes:''
    // })

    // const editChange = (e)=>{
    //     setData((prev)=>({
    //         ...prev,
    //         [e.target.name]:e.target.value
    //     }))
    // }
    return(
        <form onSubmit={handleEditSubmit} name={id} className='
           mt-3
        '>
                <label className="text-blue-700">Task Name</label><br />
                <input className="border-2 border-blue-300 rounded-md  p-2 w-full mb-4 text-sky-700
                placeholder:italic placeholder:text-blue-300
                " 
                    type="text" 
                    id={id}
                    name="taskname" 
                    placeholder="Enter Your Task" 
                    value={Value.taskname} 
                    onChange={editChange} /><br />


                <label className="text-blue-700">Task Description</label><br />
                <textarea className="border-2 rounded-md
                border-blue-300 text-sky-700 
                placeholder:italic placeholder:text-blue-300
                p-2 w-full" 
                    type="text" 
                    id={id}
                    name="taskdes" 
                    placeholder="Task Description" 
                    value={Value.taskdes} 
                    onChange={editChange} /><br />

                <button className="
                    w-30
                    border
                    border-sky-700
                    rounded-md
                bg-sky-500
                    text-white
                    font-medium
                    px-8 py-.5
                    mb-2
                    mt-2
                    text-md
                    hover:bg-sky-700
                "
                >
                    Update
                </button>
        </form>
    )
}