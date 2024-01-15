"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const SignupSchema = Yup.object().shape({
  comment : Yup.string()
})


const CommentForm = ({ id }) => {
  const [ content, setContent ] = React.useState(null);
  const { data } = useSession();
  console.log(data, "comment section")
  const router = useRouter();
  const [ error, setError ] = React.useState(null)
  return (
    <div className={`mx-auto w-[40rem] max-w-[90%] my-10 text-left ${!data && "flex justify-center"}`}>
      {
        data ? (
          <Formik
          initialValues={{
            _id : id,
            comment : ""
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values)=>{
            const finalValues = {
              ...values,
              email : data?.user?.email,
              name : data?.user?.name
            }
            try {
              const res = await fetch("/api/createcomment", {
                method : "POST",
                headers : {
                  "Content-Type" : "application/json"
                },
                body : JSON.stringify(finalValues)
              })
              console.log(res)
              if (res.ok) {
                console.log("okay")
                setContent(
                  <div className='text-center bg-gray-600 py-5 px-5 mt-5 text-white'>
                    <h1>Thank you for submitting your comment!</h1>
                    <p>Once it&apos;s been approved, it will appear below!</p>
                  </div>
                )
              }
            }catch(error){
              console.error(error, "PROBLEM FROM REGISTER")
            }
          }}
          >
            {({ errors, touched, isSubmitting, values }) => (
            <Form className='flex flex-col space-y-3'>
              <div>
                <label>Comment</label>
                <Field name="comment"  className="forms" as="textarea" rows="5" placeholder="Enter your comment"/>
                {errors.comment&& touched.comment? (
                  <div className='text-red-700'>{errors.comment}</div>
                ) : null}
              </div>
              {
                error && <p className='text-red-500'>the email {values.email} already exists</p>
              }
              <button type="submit" disabled={isSubmitting}  className='w-full py-2 mt-2 text-center text-white bg-green-600 rounded-md focus:outline-none disabled:bg-green-300'>Submit</button>
            </Form>
          )}
          </Formik>
        ) : (
          <button 
          onClick={signIn}
          className='bg-green-400 rounded-md py-2 px-4 text-white font-semibold text-center'>Sign in to comment</button>
        )
      }
      { content }
    </div>
  )
}

export default CommentForm