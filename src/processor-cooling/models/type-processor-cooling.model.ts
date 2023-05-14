import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ProcessorCoolingModel} from "./processor-cooling.model";

interface TypeProcessorCoolingCreationAttrs {
    readonly name: string
    readonly parserId: number
}


@Table({tableName: 'type-processor-cooling'})
export class TypeProcessorCoolingModel extends Model<TypeProcessorCoolingModel, TypeProcessorCoolingCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    parserId: number

    @HasMany(() => ProcessorCoolingModel)
    processorCooling: ProcessorCoolingModel
}