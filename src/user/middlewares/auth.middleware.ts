import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { UserService } from "../user.service";

const configService = new ConfigService();

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly userService: UserService) {

    }
    async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
        if(!req.headers.authorization) {
            req.user = null
            
            return next()
        }
        const token = req.headers.authorization.split(' ')[1]

        try{
            const decode = verify(token, configService.get('JWT_TOKEN'))
            const user = await this.userService.findById(decode.id)
            req.user = user
            next()

        } catch(err) {
            req.user = null
            next()
        }
    }
}