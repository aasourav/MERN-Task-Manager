import { Link } from "react-router-dom";
import Button from "../../commonComponent/Button";

export default function LoggedIn({handleClick}){
    return(
        <Link to='/logout'>
            <div className="
                font-medium
                mt-12
                text-lg
                border-2
                border-sky-700
                text-sky-700
                rounded-md
                w-20
                text-center
                hover:text-white
                hover:bg-sky-700
                mx-1
            "> 
                <Button btnName="Logout" handleClick={handleClick}/>
            </div>
        </Link>
    )
}