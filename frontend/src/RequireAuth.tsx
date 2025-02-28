import { useSelector } from "react-redux"
import { RootState } from "./store/store"
import { Navigate, useLocation } from "react-router-dom"
import { ReactNode } from "react"





function RequireAuth({children}: {children: ReactNode}) {

    const {isAuthenticated}= useSelector((state : RootState)=> state.auth)
    const location = useLocation()

    if(!isAuthenticated){
        return <Navigate to="/login" state={{from: location}} replace />
    }
  return children
}

export default RequireAuth