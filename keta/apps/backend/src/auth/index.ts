import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { envConfig } from '../app';
import CryptoJS from 'crypto-js'

const permissionsMap = new Map<string, string>([
  ['/api/users', 'authed'],
  ['/api/register', 'public'],
  ['/api/login', 'public'],
  ['/api/ares_master', 'public'],
  ['/api/createAres', 'public']
]);

export const globalAuth = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const auth = CryptoJS.AES.decrypt(req.headers.authorization?.split(' ')[1] ?? '', envConfig.SECRET_JWT_KEY).toString(CryptoJS.enc.Utf8);

  const requiredPermissions = permissionsMap.get(path);

  if (!requiredPermissions) {
    return res.status(403).json({ error: 'Forbidden due to no permissions set' });
  }

  if (requiredPermissions.includes('public')) {
    return next();
  }

  if(!auth || auth === '') {
    return res.status(403).json({error: 'Forbidden due to no authentication'})
  }

  if(!verify(auth, envConfig.SECRET_JWT_KEY)) return res.status(403).json({error: 'Forbidden due to mismatch of tokens'})

  //i might add some more shields here, privileges or some shit
  next();
};
