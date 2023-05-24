import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {User} from "./models/users.model";
import {JwtModule, JwtService} from "@nestjs/jwt"
import {JwtAuthGuard} from "./guards/jwt-auth.guard";


@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            secret: 'secret',
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ],
    exports: [
        JwtModule
    ]
})
export class UsersModule {}