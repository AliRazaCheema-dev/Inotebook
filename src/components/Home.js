
import React  from 'react'
import Notes from './Notes'
export const Home = (props) => {
  const {showAlert} = props;
  return (
    <div className="mx-5 my-2">
      
      <Notes showAlert={showAlert}/>
    </div>
  )
}
