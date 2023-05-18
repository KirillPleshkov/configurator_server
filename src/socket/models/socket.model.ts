import {Column, DataType, Model, Table} from "sequelize-typescript";

interface SocketCreationAttrs {
    readonly name: string
}


@Table({tableName: 'socket'})
export class SocketModel extends Model<SocketModel, SocketCreationAttrs> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string
}