import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../users/models/users.model";
import {RamModel} from "../../ram/models/ram.model";
import {PowerSupplyModel} from "../../power-supply/models/power-supply.model";
import {MotherboardModel} from "../../motherboard/models/motherboard.model";
import {ProcessorModel} from "../../processor/models/processor.model";
import {VideoCardModel} from "../../video-card/models/video-card.model";
import {DataStorageModel} from "../../data-storage/models/data-storage.model";
import {ProcessorCoolingModel} from "../../processor-cooling/models/processor-cooling.model";


interface AssemblyCreationAttrs {
    readonly name: string
    readonly userId: number
    readonly ramId: number
    readonly powerSupplyId: number
    readonly motherboardId: number
    readonly processorId: number
    readonly videoCardId: number
    readonly dataStorageId: number
    readonly processorCoolingId: number
}

@Table({tableName: 'assembly'})
export class AssemblyModel extends Model<AssemblyModel, AssemblyCreationAttrs> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number

    @ForeignKey(() => RamModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    ramId: number

    @ForeignKey(() => PowerSupplyModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    powerSupplyId: number

    @ForeignKey(() => MotherboardModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    motherboardId: number

    @ForeignKey(() => ProcessorModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    processorId: number

    @ForeignKey(() => VideoCardModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    videoCardId: number

    @ForeignKey(() => DataStorageModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    dataStorageId: number

    @ForeignKey(() => ProcessorCoolingModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    processorCoolingId: number


    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => RamModel)
    ram: RamModel

    @BelongsTo(() => PowerSupplyModel)
    powerSupply: PowerSupplyModel

    @BelongsTo(() => MotherboardModel)
    motherboard: MotherboardModel

    @BelongsTo(() => ProcessorModel)
    processor: ProcessorModel

    @BelongsTo(() => VideoCardModel)
    videoCard: VideoCardModel

    @BelongsTo(() => DataStorageModel)
    dataStorage: DataStorageModel

    @BelongsTo(() => ProcessorCoolingModel)
    processorCooling: ProcessorCoolingModel
}