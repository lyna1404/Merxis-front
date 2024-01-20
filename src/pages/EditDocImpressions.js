import React from 'react'
import { useParams } from 'react-router-dom'

function EditDocImpressions() {

    const { id } = useParams();
    console.log(id)

  return (
    <div>EditDocImpressions</div>
  )
}

export default EditDocImpressions