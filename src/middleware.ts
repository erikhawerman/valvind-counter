import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");
  console.log("request", request);
  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const auth = basicAuth.split(" ")[1] ?? ""; // Add nullish coalescing operator to provide a default value
    const [user, password] = Buffer.from(auth, "base64").toString().split(":");

    if (
      user === process.env.BASIC_USER &&
      password === process.env.BASIC_PASS
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}
