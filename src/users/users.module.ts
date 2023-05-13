import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {User} from "./models/users.model";
import {JwtModule} from "@nestjs/jwt"


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
        })
    ]
})
export class UsersModule {}