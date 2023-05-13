import {Column, DataType, Model, Table} from "sequelize-typescript";

interface RamCreationAttrs {
    readonly name: string
    readonly totalVolume: number
}

@Table({tableName: 'ram'})
export class RamModel extends Model<RamModel, RamCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id : number

    @Column({type: DataType.STRING, allowNull: false})
    name : string

    @Column({type: DataType.INTEGER, allowNull: false})
    totalVolume : number
}