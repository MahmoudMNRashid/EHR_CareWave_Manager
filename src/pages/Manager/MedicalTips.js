import React from 'react'
import { TipsCard } from '../../components/Manager/TipsCard'
import { Button } from '../../components/UI/Button'
import s from '../../components/Manager/TipsCard.module.css'

export const MedicalTips = () => {
  const svg= <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
  return (
    <>
    <div className={s.grid}>
    <TipsCard/>
    <TipsCard/>
    <TipsCard/>
    <TipsCard/>
    <TipsCard/>
    <TipsCard/>
    </div>
    <Button title='إضافة' icon={svg}/> 
    
    </>
  )
}
