import { Link } from 'react-router-dom';
import Button from "../../commonComponent/Button";
export default function LoggedOut(){
    return(
        <div className='flex mt-12'>
                <Link to='/login'>
                    <div className="
                        font-medium
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
                            <Button className='text-sky-800' btnName='Login'/> 
                        </div>
                </Link>
                <Link to='/reg'>
                    <div className="
                        font-medium
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
                    ">
                        <Button btnName='Register'/>
                    </div>
                </Link>
        </div>
    )
}