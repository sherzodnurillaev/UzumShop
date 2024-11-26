import { useContext, useState } from "react"
import SignUp from "../Components/Sign/SignUp"
import Login from "../Components/Sign/SignIn"
import { States } from "../App";

const Sign = () => {
    const { state, setState } = useContext(States);
    return (
        <>
         <center className="grid place-items-center h-screen">

            <div className="w-[300px] border-[2px] py-[20px] rounded-[12px]">
                {
                    state ? <SignUp /> : <Login />
                    // SignUp
                }
                <p className="text-[12px]">
                    {state ? 
                        "Already have an account? " : "If you don't have an account, "
                    }
                    <span onClick={() => setState(!state)} className="text-blue-500 cursor-pointer">
                        {state ? "login" : "register"}
                    </span>
                </p>
            </div>
         </center>
        </>
    )
}

export default Sign
