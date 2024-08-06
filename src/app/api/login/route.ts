// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/api/auth"; // 認証ロジックを含むファイル

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = await signIn({ username, password });
  if (user) {
    // JWTトークンを作成し、クッキーに設定するなどの処理
    const token = createToken(user);
    const response = NextResponse.json({ success: true });
    response.cookies.set("authToken", token, { httpOnly: true });
    return response;
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
