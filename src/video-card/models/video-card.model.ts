import {Column, DataType, Model, Table} from "sequelize-typescript";


interface VideoCardCreationAttrs {
    readonly name: string
    readonly performanceLevel: number
    readonly parserId: number
    readonly recommendedPower: number
    readonly url: string
}

@Table({tableName: 'video-card'})
export class VideoCardModel extends Model<VideoCardModel, VideoCardCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.INTEGER, allowNull: false})
    performanceLevel: number

    @Column({type: DataType.INTEGER, allowNull: false})
    parserId: number

    @Column({type: DataType.INTEGER, allowNull: false})
    recommendedPower: number

    @Column({type: DataType.STRING, allowNull: false})
    url: string

}