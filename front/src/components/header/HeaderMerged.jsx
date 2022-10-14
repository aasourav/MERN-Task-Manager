import { LoggedIn } from "./LoggedIn/LoggedIn";
import LoggedOut from "./LoggedOut/LoggedOut";
import WebTitle from "./webTitle/WebTitle";


export default function HeaderMerged({loggedIn,logOut}){

    return(
        <div className="flex justify-center">
            <div className="
                w-1/2
                flex flex-row justify-between
                items-center
                
            ">
                <WebTitle/>
                {loggedIn?
                <LoggedIn logOut={logOut}/>
                :
                <LoggedOut/>
                
                }
            </div>
        </div>
        
    )
}