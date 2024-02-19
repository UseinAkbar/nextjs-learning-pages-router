import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

// halaman khusus admin
const onlyAdmin = ['/admin']

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        
		// jika pathname skrg require authentication
        if(requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            })
            console.log(token);
            
            
			// jika tokennya gaada, arahin ke login + tambahan callbackUrl
            if(!token) {
                // callbackUrl dibuat klo user tiap user lgsg arahin ke route tertentu yg butuh auth
                const url = new URL('/auth/login', req.url)
                url.searchParams.set('callbackUrl', encodeURI(req.url))
                
                // /auth/login?callbackUrl=...
                return NextResponse.redirect(url)
            }
            // jika rolenya bukan admin dan pathname skrg termasuk page khusus admin saja
            if(token.role !== 'admin' && onlyAdmin.includes(pathname)) {
                return NextResponse.redirect(new URL('/', req.url))
            }
        }
		
        return middleware(req, next)
    }
}