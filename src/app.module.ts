import {forwardRef, Module} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/models/users.model";
import {JwtAuthGuard} from "./users/guards/jwt-auth.guard";
import { RamModule } from './ram/ram.module';
import {RamModel} from "./ram/models/ram.model";
import { PriceModule } from './price/price.module';
import { DataStorageModule } from './data-storage/data-storage.module';
import {DataStorageModel} from "./data-storage/models/data-storage.model";
import {TypeDataStorageModel} from "./data-storage/models/type-data-storage.model";

@Module({
    imports: [
        UsersModule,
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'kir.kir@@',
            database: 'configurator',
            models: [User, RamModel, DataStorageModel, TypeDataStorageModel],
            autoLoadModels: true
        }),
        RamModule,
        PriceModule,
        DataStorageModule,
    ],
})
export class AppModule {}