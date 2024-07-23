import { connect } from "#/dbConfig/dbConnect";
import User from "#/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(res: NextResponse) {
  try {
    const resBody = await res.json();
    const { username, password } = resBody;

    const validUsername = await User.findOne({ username: username });
    if (!validUsername) {
      return NextResponse.json({
        error: "Invalid .username" + username,
        status: 401,
      });
    }

    const checkPassword = await bcryptjs.compare(
      password,
      validUsername.password
    );

    if (checkPassword) {
      const response = NextResponse.json({
        message: "Login successful",
        userId: validUsername._id,
        status: 200,
      });

      const tokenData = {
        username: validUsername.username,
        email: validUsername.email,
        id: validUsername._id,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SERCET!, {
        expiresIn: "1d",
      });

      response.cookies.set("token", token, { httpOnly: true });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid password", status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Unprocessable Entity", status: 422 });
  }
}
