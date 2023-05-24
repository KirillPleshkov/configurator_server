import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {RegistrationDto} from "./dto/RegistrationUser.dto";
import {UsersService} from "./users.service";
import {LoginDto} from "./dto/LoginUser.dto";
import {ValidationPipe} from "../pipes/validation.pipe";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() registrationDto: RegistrationDto) {
        return this.usersService.registration(registrationDto)
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto)
    }
}
