// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Button from "../../commonComponent/Button";

// axios.defaults.withCredentials=true;

export function LoggedIn({logOut}){
    // const navigate = useNavigate()
    // const[logout,setLogout] = useState(false)

    return(
            <div className="
                font-medium
                mt-12
                text-lg
                border-2
                border-sky-700
                text-white
                bg-sky-600
                rounded-md
                w-20
                text-center
                hover:text-white
                hover:bg-sky-700
                mx-1
            "> 
                <Button btnName="Logout" handleClick={logOut}/>
            </div>
    )
}