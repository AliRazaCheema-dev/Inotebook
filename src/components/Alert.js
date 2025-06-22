import React from 'react'

function Alert(props) {
    const CapitalFirst= (word) => {
        if (word === "danger"){
            word = "error:"
        }
       return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  return (
  props.alert &&  <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong> {CapitalFirst(props.alert.type)}</strong> {props.alert.msg}
</div>
  )
}

export default Alert