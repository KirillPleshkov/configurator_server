import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {AssemblyModel} from "../../assembly/models/assembly.model";


interface UserCreationAttrs {
    readonly email: string
    readonly password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id : number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @HasMany(() => AssemblyModel)
    processorModel: AssemblyModel
}