import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {AssemblyModel} from "../../assembly/models/assembly.model";

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

    @Column({type: DataType.STRING})
    url : string

    @HasMany(() => AssemblyModel)
    processorModel: AssemblyModel
}