import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset :  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn : true,
  token : process.env.NEXT_PUBLIC_SANITY_API_TOKEN
})


export async function POST(req, res){
  const body = await req.json();
  const { name, email, comment, _id } = body
  try {
    await client.create({
      _type : "comment",
      post : {
        _type : "reference",
        _ref : _id
      },
      name,
      email,
      comment
    })
    console.log("Comment Submitted")
    return NextResponse.json({ message : "Registration Successful" }, { status : 200 })
  } catch (error) {
    return NextResponse.json({ message : "Registration failed" }, { status : 500 })
    // console.log(error, "ERROR FROM CREATE COMMENT")
  }
  // console.log(body)
  // return NextResponse.json({ status: 200, body: { message: "Hello World" } })
}