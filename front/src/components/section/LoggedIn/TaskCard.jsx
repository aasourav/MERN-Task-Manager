import EditForm from "./EditForm";

export default function TaskCard({edit,ID,handleToggleEdit,tasks,handleDelete,handleComplete,handleEditSubmit,editData,editChange}){
    return(
        tasks.map((data,index)=>(
            <div key={index} className="
                mt-2
                w-1/2
                border-2 border-sky-200
                px-5 py-3
                rounded-md
                bg-white
                ">
                <div  >
                    <h3  name={index} className={data.status?"text-2xl text-yellow-700 font-medium mb-2 underline underline-offset-8":"text-2xl text-gray-300 font-medium mb-2 underline underline-offset-8"}>{data.taskname}</h3>

                    <p  className={data.status?"text-sky-700 text-lg":'text-sky-200 text-lg'} name={index}>{data.taskdes}</p>
                    
                    <p  className="
                        text-sm font-extralight
                        text-gray-500 italic
                    " name={index}>Task Created at: {data.created}</p>

                        {edit && parseInt(index) === parseInt(ID)?
                        <EditForm 
                            Value={editData} 
                            handleEditSubmit={handleEditSubmit} 
                            editChange={editChange}
                            id={index}
                        /> : 
                        null}
                 </div>
                <div>
                    <button className={!data.status?"text-white border bg-sky-800 border-sky-800 rounded px-3 mr-1 hover:bg-sky-800 hover:text-white":"text-sky-700 border border-sky-800 rounded px-3 mr-1 hover:bg-sky-800 hover:text-white"}name='status'  id={index} onClick={handleComplete}>{!data.status ? 'Mark Incomplete' : 'Mark Complete'}</button>

                    <button className="
                        text-sky-700 border border-sky-800
                        rounded px-3 mr-1
                        hover:bg-sky-800 hover:text-white
                    " name='edit'  id={index} onClick={handleToggleEdit}>{edit && parseInt(index) === parseInt(ID)? 'Cancel Edit' : 'Edit'}</button>

                    <button className="
                        text-sky-700 border border-sky-800
                        rounded px-3 mr-1
                        hover:bg-sky-800 hover:text-white
                    " name='delete'  id={index} onClick={handleDelete}>Delete</button>
                    
                    
                </div>
            </div>
        ))
    )
}