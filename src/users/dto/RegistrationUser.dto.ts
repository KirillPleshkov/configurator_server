import {IsEmail, IsString, Length} from "class-validator"

export class RegistrationDto {

    @IsString({message: "Значение должно быть строкой"})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string

    @IsString({message: "Значение должно быть строкой"})
    @Length(6, 16,{message: "Некорректная длина пароля (от 6 до 16 символов)"})
    readonly password1: string
    readonly password2: string
}