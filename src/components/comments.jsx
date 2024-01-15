"use client"
import React from 'react'

const Comments = ({ comments }) => {
  return (
    <div className='w-full flex flex-col p-10 my-10 mx-auto shadow-gray-500 shadow-lg space-y-2'>
      <h3 className='text-3xl font-semibold '>Comments</h3>
      {
        comments.length ? comments.map((comment, index) => (
          <div key={index}>
            <p>
              <span className='text-purple-700'>{comment.name}</span> {" "} {comment.comment}
            </p>
          </div>
        )): (
          <p className='text-center'>No comments yet!</p>
        )
      }
    </div>
  )
}

export default Comments