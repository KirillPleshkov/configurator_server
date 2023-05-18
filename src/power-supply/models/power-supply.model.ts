import {Column, DataType, Model, Table} from "sequelize-typescript";

interface PowerSupplyCreationAttrs {
    readonly power: number
    readonly url: string
}


@Table({tableName: "power-supply"})
export class PowerSupplyModel extends Model<PowerSupplyModel, PowerSupplyCreationAttrs> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    power: number

    @Column({type: DataType.STRING, allowNull: false})
    url: string
}