import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
    //the images/icons matcher is temporary, I don't have a solution rn
    '/((?!_next|favicon|.*\\.svg$|.*\\.png$|.*\\.ico$).*)',
  ],
}

export async function middleware(request: NextRequest) {
  const cookieJwt = request.cookies.get('authorization')?.value

  if(request.nextUrl.pathname.includes('login') || request.nextUrl.pathname.includes('register')) {
    if(cookieJwt) return NextResponse.redirect(new URL('/', request.url), {
      status: 303,
    })
    return NextResponse.next()
  }
  if(!cookieJwt) return NextResponse.redirect(new URL('/login', request.url), {
    status: 303,
  })

  return NextResponse.next()
}

/**
 * IF SOMETIME I NEED PARAMS OF THE URL, EL CODE
 */
// const PATTERNS = [
//   [
//     new URLPattern({ pathname: '/:uname' }),
//     //@ts-expect-error any type
//     ({ pathname }) => pathname.groups,
//   ],
// ]

// const params = (url: string) => {
//   const input = url.split('?')[0]
//   let result = {}

//   for (const [pattern, handler] of PATTERNS) {
//     //@ts-expect-error Property 'exec' does not exist on type '_URLPattern | (({ pathname }: { pathname: any; }) => any)'.
//     const patternResult = pattern.exec(input)
//     if (patternResult !== null && 'pathname' in patternResult) {
//       //@ts-expect-error Type '_URLPattern' has no call signatures.
//       result = handler(patternResult)
//       break
//     }
//   }
//   return result
// }
