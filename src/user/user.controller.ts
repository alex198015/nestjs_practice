import { UserResponseInterface } from './types/userResponse.interface';
import { Body, Controller, Post, UsePipes, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    } 
    @Post()
    @UsePipes(new BackendValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('/login')
    @UsePipes(new BackendValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get()
    @UseGuards(AuthGuard)
    async currentUser(
        // @Req() request: ExpressRequestInterface,
        @User() user: UserEntity,
        @User('id') currentUserId: number,
        ): Promise<UserResponseInterface> {
            console.log('userId' , currentUserId);
            
        return this.userService.buildUserResponse(user)
    }

    @Put()
    @UseGuards(AuthGuard)
    async updateCurrentUser(
        @User('id') currentUserId: number,
        @Body('user') updateUserDto: UpdateUserDto): Promise<UserResponseInterface> {
            const user = await this.userService.updateUser(currentUserId, updateUserDto)
            return this.userService.buildUserResponse(user)
        }
}
