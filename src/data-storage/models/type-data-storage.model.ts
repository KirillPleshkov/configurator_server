import {Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import {DataStorageModel} from "./data-storage.model";

interface TypeDataStorageCreationAttrs {
    readonly name: string
}


@Table({tableName: 'type-data-storage'})
export class TypeDataStorageModel extends Model<TypeDataStorageModel, TypeDataStorageCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @HasMany(() => DataStorageModel)
    dataStorages: DataStorageModel

}