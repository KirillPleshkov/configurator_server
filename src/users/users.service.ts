import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/users.model";
import {RegistrationDto} from "./dto/RegistrationUser.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {LoginDto} from "./dto/LoginUser.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private jwtService: JwtService) {}

    async registration(registrationDto: RegistrationDto) {

        if (registrationDto.password1 !== registrationDto.password2)
            throw new HttpException({error: {password: "Пароли не совпадают"}}, HttpStatus.BAD_REQUEST)

        const isEmailFound = await this.getUserByEmail(registrationDto.email)

        if(isEmailFound)
            throw new HttpException({error: {email: "Аккаунт с таким email уже существует"}}, HttpStatus.BAD_REQUEST)

        const hashPassword = await bcrypt.hash(registrationDto.password1, 5)

        const user = await this.userRepository.create({email: registrationDto.email, password: hashPassword})

        return this.generateToken(user)
    }

    async login(loginDto: LoginDto) {

        const user = await this.getUserByEmail(loginDto.email)

        if(!user)
            throw new HttpException({error: "Некорректный email или пароль"}, HttpStatus.BAD_REQUEST)

        const passwordEquals = await bcrypt.compare(loginDto.password, user.password)

        if(!passwordEquals)
            throw new HttpException({error: "Некорректный email или пароль"}, HttpStatus.BAD_REQUEST)

        return this.generateToken(user)
    }

    private async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}})
    }

    private generateToken(user: User) {
        return {token: this.jwtService.sign({email: user.email, id: user.id})}
    }

}
