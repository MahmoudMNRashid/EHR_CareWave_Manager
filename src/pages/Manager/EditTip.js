import React from 'react'
import { EditTipForm } from '../../components/Manager/EditTipForm'
import { useParams } from 'react-router-dom';


export const EditTip = () => {
    const { data } = useParams();
    const a=JSON.parse(data);
    
  return (
    <>
    <EditTipForm info={a} />
    
    </>
  )
}
