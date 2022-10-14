
export default function AddModal({handleModal,handleAddChange,handleAddSubmit,value=''}){
    return(
    <div className="border-2 p-3 ml-64 mt-2 rounded-md w-96 flex flex-col border-sky-200 bg-white">
        <button className="
            self-end
             border-2 rounded-md px-5 py-1
             text-red-700 bg-white
             font-medium active:bg-gray-200
             active:text-sky-800 
        
        " onClick={handleModal}>X</button>

        <form onSubmit={handleAddSubmit} className='
           ml-3
        '>
                <label className="text-blue-700">Task Name</label><br />
                <input className="border-2 border-blue-300 rounded-md  p-2 w-full mb-4 text-sky-700
                placeholder:italic placeholder:text-blue-300
                " 
                type="text" 
                name="taskname" 
                placeholder="Enter Your Task" 
                onChange={handleAddChange}
                value={value.taskname}
                /><br />


                <label className="text-blue-700">Task Description</label><br />
                <textarea className="border-2 rounded-md
                border-blue-300 text-sky-700 
                placeholder:italic placeholder:text-blue-300
                p-2 w-full" 
                type="text" 
                name="taskdes" 
                placeholder="Task Description" 
                onChange={handleAddChange}
                value={value.taskdes}
                /><br />

                <button className="
                    w-30
                    border
                    border-sky-700
                    rounded-md
                    bg-sky-500
                    text-white
                    font-medium
                    px-8 py-1
                    mt-5
                    text-md
                    hover:bg-sky-700
                "
                >
                        Submit
                </button>
        </form>
        
    </div>)
    
}