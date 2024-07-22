import { connect } from "#/dbConfig/dbConnect";
import User from "#/models/userModel";
import {  NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect();

export async function POST(response: NextResponse) {
  try {
    const reqBody = await response.json();
    const { email, password, username } = reqBody;
    if (await User.findOne({ email })) {
      return NextResponse.json(
        { error: `User with ${email} already exists` },
        { status: 409 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, salt);
    
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
    });
    const user= await newUser.save()
    return NextResponse.json({user,status:'success'},{status:200})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
