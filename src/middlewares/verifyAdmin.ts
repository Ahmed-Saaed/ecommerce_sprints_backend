import  Express ,{Request ,Response} from "express";
import jwt, { Secret } from "jsonwebtoken";



const verifyAdmin = (req: Request, res: Response, next: Express.NextFunction):void => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = (authorizationHeader as string).split(' ')[1]
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    console.log( (decoded as jwt.JwtPayload).user.role)
    if( (decoded as jwt.JwtPayload).user.role !== req.body.role){
        throw new Error('role does not match!')
    }
  } catch (err){
    res.status(401)
    res.json((err as Error).message)
    return
  }
}




export default verifyAdmin;