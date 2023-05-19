import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ProcessorSeriesModel} from "./processor-series.model";
import {ProcessorCodeNameModel} from "./processor-code-name.model";
import {SocketModel} from "../../socket/models/socket.model";


interface ProcessorCreationAttrs {
    readonly seriesId: number
    readonly codeNameId: number
    readonly socketId: number
    readonly performanceLevel: number
    readonly url: string
}

@Table({tableName: 'processor'})
export class ProcessorModel extends Model<ProcessorModel, ProcessorCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
    id: number

    @ForeignKey(() => ProcessorSeriesModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    seriesId: number

    @ForeignKey(() => ProcessorCodeNameModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    codeNameId: number

    @ForeignKey(() => SocketModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    socketId: number

    @Column({type: DataType.INTEGER, allowNull: false})
    performanceLevel: number

    @Column({type: DataType.STRING, allowNull: false})
    url: string



    @BelongsTo(() => ProcessorSeriesModel)
    series: ProcessorSeriesModel

    @BelongsTo(() => ProcessorCodeNameModel)
    codeName: ProcessorCodeNameModel

    @BelongsTo(() => SocketModel)
    socket: SocketModel
}