import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ProcessorModel} from "./processor.model";


interface ProcessorCodeNameCreationAttrs {
    readonly name: string
    readonly parserId: number
}

@Table({tableName: 'processor-code-name'})
export class ProcessorCodeNameModel extends Model<ProcessorCodeNameModel, ProcessorCodeNameCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.INTEGER, allowNull: false})
    parserId: number

    @HasMany(() => ProcessorModel)
    processorModel: ProcessorModel

}