export default function Input({title,type,name,placeholder,handleChange,value}){
    return(
        <div className="w-1/2">
            <label className="block mt-4">
            <span className="
                
                after:content-['*'] 
                after:ml-0.5 
                after:text-red-500 block 
                text-md
                font-bold
                text-slate-700">
                {title}
            </span>
            </label>
            <br />
            <input className="
                -mt-5 px-3 py-2
                bg-white border shadow-sm
                border-slate-300 
                placeholder-slate-400 
                focus:outline-none 
                focus:border-sky-500
                focus:ring-sky-500 block 
                rounded-md 
                sm:text-sm 
                focus:ring-1
            "
            type={type} name={name} placeholder={placeholder} onChange={handleChange} value={value}/>
        </div>
    )
}