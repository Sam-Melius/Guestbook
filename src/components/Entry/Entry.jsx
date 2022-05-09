import React from 'react'

export default function Entry({ author, content}) {
  return (
    <>
    <div>Entry</div>
    <p>{content}</p>
    <p>{author}</p>
    </>
  )
}
