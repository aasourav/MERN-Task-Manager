import Input from "../../../commonComponent/Input";

export default function Register({handleRegSubmit,handleRegChange,value}){
    return(
        <div className="
            flex
            flex-col
            mt-32
            items-center
        ">
            <h1 className="
                text-sky-700
                text-2xl
                font-medium
            ">Register</h1>
            <form onSubmit={handleRegSubmit}>
                <Input title='Username' type='text' name='username' placeholder='Enter new username' handleChange={handleRegChange} value={value.username}/>

                <Input title='Email' type='email' name='email' placeholder='Enter your email' handleChange={handleRegChange} value={value.email}/>

                <Input title='Password' type='password' name='password' placeholder='Enter your password' handleChange={handleRegChange} value={value.password}/>

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
                ">
                        Submit
                </button>
        </form>
        </div>
        
    )
}