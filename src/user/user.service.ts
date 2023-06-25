import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt'
import { UpdateUserDto } from './dto/updateUser.dto';

const configService = new ConfigService()

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {

    }
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const errorResponse = {
            errors: {}
        }
        const {email, username} = createUserDto

        const userByEmail = await this.userRepository.findOne({
            where: {email}
        })

        const userByUsername = await this.userRepository.findOne({
            where: {username}
        })

        if(userByEmail) {
            errorResponse.errors['email'] = 'has already been taken'
        }

        if(userByUsername) {
            errorResponse.errors['username'] = 'has already been taken'
        }

        if(userByEmail || userByUsername) {
            throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        
        return await this.userRepository.save(newUser)
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const errorResponse = {
            'email or password': 'is invalid'
        }

        const user = await this.userRepository.findOne({
            where: {email: loginUserDto.email},
            select: ['id', 'username', 'email', 'bio', 'image', 'password']
        })

        if(!user) {
            throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const isPasswordCorrect = await compare(loginUserDto.password, user.password )

        if(!isPasswordCorrect) {
            throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY)
        }

        delete user.password

        return user
    }

    findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({where: {id}})
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId)
        Object.assign(user, updateUserDto)
        return await this.userRepository.save(user)
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, configService.get('JWT_TOKEN'))
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }


}
