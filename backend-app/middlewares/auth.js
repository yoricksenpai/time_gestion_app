import jwt from 'jsonwebtoken';

/**
 * Middleware pour authentifier un utilisateur en fonction d'un token.
 *
 * @async
 * @param {import('express').Request} req - La requ te Express.
 * @param {import('express').Response} res - La r pONSE Express.
 * @param {import('express').NextFunction} next - La fonction next Express.
 * @throws {Error} Si le token n'est pas fourni ou si le token est invalide.
 */
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentification requise' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

export default authMiddleware;