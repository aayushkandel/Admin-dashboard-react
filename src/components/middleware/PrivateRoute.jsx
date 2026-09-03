import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { ProductContext } from '../../pages/inventory/ProductProvider'

const PrivateRoute = ({children}) => {
    const {admin,loading}=useContext(ProductContext);
  
    if(loading){
        return <div>Loading...</div>
    }

    if(!admin){
        return<Navigate to ="/" replace />
    }
    
    return children;
  
}

export default PrivateRoute