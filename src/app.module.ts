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
import {MotherboardModel} from "./motherboard/models/motherboard.model";
import { VideoCardModule } from './video-card/video-card.module';
import {VideoCardModel} from "./video-card/models/video-card.model";
import { ProcessorModule } from './processor/processor.module';
import {ProcessorModel} from "./processor/models/processor.model";
import {ProcessorCodeNameModel} from "./processor/models/processor-code-name.model";
import {ProcessorSeriesModel} from "./processor/models/processor-series.model";

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
                SocketModel,
                MotherboardModel,
                VideoCardModel,
                ProcessorModel,
                ProcessorCodeNameModel,
                ProcessorSeriesModel
            ],
            autoLoadModels: true
        }),
        RamModule,
        DataStorageModule,
        ProcessorCoolingModule,
        ComponentsInfoModule,
        PowerSupplyModule,
        MotherboardModule,
        VideoCardModule,
        ProcessorModule,
    ],
})
export class AppModule {}