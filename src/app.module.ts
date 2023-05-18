import {forwardRef, Module} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/models/users.model";
import {JwtAuthGuard} from "./users/guards/jwt-auth.guard";
import { RamModule } from './ram/ram.module';
import {RamModel} from "./ram/models/ram.model";
import { DataStorageModule } from './data-storage/data-storage.module';
import {DataStorageModel} from "./data-storage/models/data-storage.model";
import {TypeDataStorageModel} from "./data-storage/models/type-data-storage.model";
import { ProcessorCoolingModule } from './processor-cooling/processor-cooling.module';
import {TypeProcessorCoolingModel} from "./processor-cooling/models/type-processor-cooling.model";
import {ProcessorCoolingModel} from "./processor-cooling/models/processor-cooling.model";
import { ComponentsInfoModule } from './components-info/components-info.module';
import { PowerSupplyModule } from './power-supply/power-supply.module';
import {PowerSupplyModel} from "./power-supply/models/power-supply.model";
import {SocketModel} from "./socket/models/socket.model";
import { MotherboardModule } from './motherboard/motherboard.module';

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
            models: [
                User,
                RamModel,
                DataStorageModel,
                TypeDataStorageModel,
                TypeProcessorCoolingModel,
                ProcessorCoolingModel,
                PowerSupplyModel,
                SocketModel
            ],
            autoLoadModels: true
        }),
        RamModule,
        DataStorageModule,
        ProcessorCoolingModule,
        ComponentsInfoModule,
        PowerSupplyModule,
        MotherboardModule,
    ],
})
export class AppModule {}