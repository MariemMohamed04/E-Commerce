import { createContext, useState } from "react";

export let userContext=createContext()

export default function UserContextProvider(props){

const [userToken,setToken]=useState(null)
return <userContext.Provider value={{userToken , setToken}}>
{props.children}
</userContext.Provider>
}