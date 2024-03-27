import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decryptAuthHash } from './requests/crypto'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login_
     * - register
     *
     * can allow paths if you include "has" or "missing"
      {
      source: '/((?!login/register).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
      },
     */
    '/((?!login|register|_next).*)',
  ],
}

export async function middleware(request: NextRequest) {
  const cookieJwt = request.cookies.get('authorization')?.value

  if(!cookieJwt) return NextResponse.redirect(new URL('/login', request.url), {
    status: 303,
  })
  const decrypredJWT = decryptAuthHash(cookieJwt)

  if(!decrypredJWT) return NextResponse.redirect(new URL('/login', request.url), {
    status: 303,
  })
  const response = NextResponse.next()
  return response
}

