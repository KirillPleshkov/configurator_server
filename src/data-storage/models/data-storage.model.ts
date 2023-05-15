import {Column, DataType, Model, Table, BelongsTo, HasOne, ForeignKey} from "sequelize-typescript";
import {TypeDataStorageModel} from "./type-data-storage.model";

interface DataStorageCreationAttrs {
    readonly volume: number
    readonly typeId: number
    readonly parsingId: number
}

@Table({tableName: 'data-storage'})
export class DataStorageModel extends Model<DataStorageModel, DataStorageCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    volume: number

    @Column({type: DataType.INTEGER, allowNull: false})
    parsingId: number

    @Column({type: DataType.STRING})
    url : string

    @ForeignKey(() => TypeDataStorageModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    typeId: number

    @BelongsTo(() => TypeDataStorageModel)
    type: TypeDataStorageModel
}