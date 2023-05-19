import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ProcessorModel} from "./processor.model";

interface ProcessorSeriesCreationAttrs {
    readonly name: string
    readonly parserId: number
}

@Table({tableName: 'processor-series'})
export class ProcessorSeriesModel extends Model<ProcessorSeriesModel, ProcessorSeriesCreationAttrs> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.INTEGER, allowNull: false})
    parserId: number

    @HasMany(() => ProcessorModel)
    processorModel: ProcessorModel

}