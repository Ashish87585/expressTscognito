import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'

class AuthController {
    public path = '/auth'
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/signup', this.validateBody('signup'), this.signup)
        this.router.post('/signin', this.validateBody('signin'), this.signin)
        this.router.post('/verify', this.validateBody('verify'), this.verify)
    }

    signup(req: Request, res: Response) {
        const result = validationResult(req);
        if(!result.isEmpty()) {
            return res.status(422).json({ errors: result.array() })
        }
        return res.status(200).json({
            body: req.body
        })
    }

    signin(req: Request, res: Response) {
        const result = validationResult(req);
        if(!result.isEmpty()) {
            return res.status(422).json({ errors: result.array() })
        }
        console.log('Signin body is valid');
        
    }

    verify(req: Request, res: Response) {
        const result = validationResult(req);
        if(!result.isEmpty()) {
            return res.status(422).json({ errors: result.array() })
        }
        console.log('Verify body is valid');
        
    }

    private validateBody(type: string) {
        switch(type) {
            case 'signup':
               return [
                    body('username').notEmpty().isLength({ min: 3 }),
                    body('email').notEmpty().isEmail(),
                    body('password').isString().isLength({ min: 6 }),
                    body('birthdate').exists().isISO8601(),
                    body('name').notEmpty().isString(),
                    body('family_name').notEmpty().isString()
                ]
            case 'signin':
               return [
                    body('username').notEmpty().isLength({ min: 3 }),
                    body('password').isString().isLength({ min: 6 })
                ]
            case 'verify':
               return [
                    body('username').notEmpty().isLength({ min: 3 }),
                    body('code').isString().isLength({ min: 6, max: 6 })
                ]
        }
    }
}

export default AuthController