import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token Invalid' })
  }

  const [_,token] = authorization.split(' ')
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload
    req.user_id = sub
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token Expired' })
  }
}
