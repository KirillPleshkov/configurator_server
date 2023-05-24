import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {AssemblyModel} from "../../assembly/models/assembly.model";

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

    @HasMany(() => AssemblyModel)
    processorModel: AssemblyModel
}