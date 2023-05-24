import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {TypeProcessorCoolingModel} from "./type-processor-cooling.model";
import {AssemblyModel} from "../../assembly/models/assembly.model";


interface ProcessorCoolingCreationAttrs {
    readonly numberFans: number
    readonly parserId: number
    readonly typeId: number
    readonly url: string
}

@Table({tableName: 'processor-cooling'})
export class ProcessorCoolingModel extends Model<ProcessorCoolingModel, ProcessorCoolingCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    numberFans: number

    @Column({type: DataType.INTEGER, allowNull: false})
    parserId: number

    @ForeignKey(() => TypeProcessorCoolingModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    typeId: number

    @Column({type: DataType.STRING, allowNull: false})
    url : string

    @BelongsTo(() => TypeProcessorCoolingModel)
    type: TypeProcessorCoolingModel

    @HasMany(() => AssemblyModel)
    processorModel: AssemblyModel
}