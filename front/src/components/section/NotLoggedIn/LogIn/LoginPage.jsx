import Input from "../../../commonComponent/Input";

export default function LoginPage({handleLogSubmit,handleLogChange,value}){
    return(
        <div className="
            flex
            flex-col
            mt-32
            items-center
        ">
            <h1 className="
                text-sky-700
                text-3xl
                font-medium
            ">Login</h1>
            <form onSubmit={handleLogSubmit}>
                <Input title='Username' type='text' name='username' placeholder='Enter new username' handleChange={handleLogChange} value={value.username}/>

                <Input title='Password' type='password' name='password' placeholder='Enter your password' handleChange={handleLogChange} value={value.password}/>

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
                " type="submit">
                        Submit
                </button>
        </form>
        </div>
        
    )
}