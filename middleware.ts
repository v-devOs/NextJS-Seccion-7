// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIdFromPath, isValidMongooseID } from './helpers';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {

  if( req.nextUrl.pathname.startsWith('/api/entries/') ){
    
    const id = getIdFromPath( req.nextUrl.pathname )
    
    if( !isValidMongooseID( id ) ){
      const url = req.nextUrl.clone();
      url.pathname = '/api/bad-request'
      url.search = `?message=${ id } is not a valid MongoID`

      return NextResponse.rewrite(url)
    }    
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: [
      // '/api/:path',
      '/api/entries/:path*'
    ]
}