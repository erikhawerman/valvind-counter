import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const encodedCredentials = basicAuth.split(" ")[1] ?? "";
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64",
    ).toString();
    const [username, password] = decodedCredentials.split(":");

    if (
      username === process.env.NEXT_PUBLIC_BASIC_USER &&
      password === process.env.NEXT_PUBLIC_BASIC_PASS
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}
