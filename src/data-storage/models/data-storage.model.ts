import {Column, DataType, Model, Table, BelongsTo, HasOne, ForeignKey} from "sequelize-typescript";
import {TypeDataStorageModel} from "./type-data-storage.model";

interface DataStorageCreationAttrs {
    readonly volume: number
    readonly typeId: number
}

@Table({tableName: 'data-storage'})
export class DataStorageModel extends Model<DataStorageModel, DataStorageCreationAttrs> {

    @Column({type: DataType.INTEGER, primaryKey: true, unique: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    volume: number

    @ForeignKey(() => TypeDataStorageModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    typeId: number

    @BelongsTo(() => TypeDataStorageModel)
    type: TypeDataStorageModel
}