import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";


export function mainMiddleware(req: NextRequest) {
    return NextResponse.next()
}

// passing function mainMiddleware dan array of routes yg perlu auth ke withAuth.tsx
export default withAuth(mainMiddleware, ['/profile', '/admin'])


// MIDDLEWARE UNTUK SISI FRONT-END
// // Lakukan redirect ke halaman login ketika user mengakses halaman yang ada pada matcher di bawah
// export function middleware(req: NextRequest) {
//     const isLogin = false
//     if(isLogin) return NextResponse.next();
//     return NextResponse.redirect(new URL("/auth/login", req.url));
// }

// // Matcher -> di route mana saja middleware di atas akan dieksekusi? 
// export const config = {
//     matcher: ['/product', '/about']
// }