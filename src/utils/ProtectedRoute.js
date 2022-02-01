// import React from 'react'
// import {Route, Redirect} from 'react-router-dom'

// const ProtectedRoute = ({isAuth, component: Component, ...rest}) => {
//     return (
//        <Route
//            {...rest} 
//            render={(props) => {
//                if(isAuth){
//                    return <Component/>
//                }else{
//                    return(
//                        <Redirect to={{ pathname:'/', state:{from: props.location}}} />
//                    )
//                }
//            }}
//        />
//     )
// }

// export default ProtectedRoute

import React,{useContext} from 'react'
import {Outlet } from 'react-router-dom'
import Login from '../component/authentication/Login'
import NodeContext from '../Context/auth/authContext'


const ProtectedRoute = () => {
    const authContext = useContext(NodeContext);
    const {data:{userId}}= authContext;
    //  this auth shuld be controled through authorized user. it is true for now
    const auth = userId;
    return auth ? <Outlet /> : <Login/>;
}
export default ProtectedRoute
