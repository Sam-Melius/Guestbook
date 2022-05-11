import React from 'react'

export default function Entry({ author, content, refresh}) {
  

  return (
    <>
    
    <div refresh={refresh}>Entry</div>
    <p>{content}</p>
    <p>{author}</p>
    </>
  )
}
