import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {SocketModel} from "../../socket/models/socket.model";
import {TypeProcessorCoolingModel} from "../../processor-cooling/models/type-processor-cooling.model";
import {AssemblyModel} from "../../assembly/models/assembly.model";

interface MotherboardCreationAttrs {
    readonly parserId: number
    readonly url: string
    readonly socketId: number
}

@Table({tableName: 'motherboard'})
export class MotherboardModel extends Model<MotherboardModel, MotherboardCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    parserId: number

    @Column({type: DataType.STRING, allowNull: false})
    url: string

    @ForeignKey(() => SocketModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    socketId: number

    @BelongsTo(() => SocketModel)
    socket: SocketModel

    @HasMany(() => AssemblyModel)
    processorModel: AssemblyModel
}