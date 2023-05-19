import {Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {MotherboardModel} from "../../motherboard/models/motherboard.model";
import {ProcessorModel} from "../../processor/models/processor.model";

interface SocketCreationAttrs {
    readonly name: string
}


@Table({tableName: 'socket'})
export class SocketModel extends Model<SocketModel, SocketCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @HasOne(() => MotherboardModel)
    motherboardModel: MotherboardModel

    @HasMany(() => ProcessorModel)
    processorModel: ProcessorModel
}