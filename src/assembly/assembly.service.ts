import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {AssemblyCreateDto} from "./dto/assembly-create.dto";
import jwt_decode from "jwt-decode";
import {InjectModel} from "@nestjs/sequelize";
import {AssemblyModel} from "./models/assembly.model";
import {DataStorageModel} from "../data-storage/models/data-storage.model";
import {MotherboardModel} from "../motherboard/models/motherboard.model";
import {PowerSupplyModel} from "../power-supply/models/power-supply.model";
import {ProcessorModel} from "../processor/models/processor.model";
import {ProcessorCoolingModel} from "../processor-cooling/models/processor-cooling.model";
import {RamModel} from "../ram/models/ram.model";
import {VideoCardModel} from "../video-card/models/video-card.model";
import {ProcessorSeriesModel} from "../processor/models/processor-series.model";
import {ProcessorCodeNameModel} from "../processor/models/processor-code-name.model";
import {TypeDataStorageModel} from "../data-storage/models/type-data-storage.model";
import {SocketModel} from "../socket/models/socket.model";
import {TypeProcessorCoolingModel} from "../processor-cooling/models/type-processor-cooling.model";

@Injectable()
export class AssemblyService {

    constructor(@InjectModel(AssemblyModel) private assemblyRepository: typeof AssemblyModel,
                @InjectModel(ProcessorModel) private processorRepository: typeof ProcessorModel,
                @InjectModel(DataStorageModel) private dataStorageRepository: typeof DataStorageModel,
                @InjectModel(MotherboardModel) private motherboardRepository: typeof MotherboardModel,
                @InjectModel(ProcessorCoolingModel) private processorCoolingRepository: typeof ProcessorCoolingModel) {}

    async create(assemblyCreateDto: AssemblyCreateDto, authHeader: string) {
        const token = authHeader.split(' ')[1]
        const decoded = jwt_decode(token);
        const id = decoded['id']
        assemblyCreateDto.userId = id

        return await this.assemblyRepository.create(assemblyCreateDto)
    }

    async getAll(authHeader: string) {
        const token = authHeader.split(' ')[1]
        const decoded = jwt_decode(token);
        const id = decoded['id']

        const models = await this.assemblyRepository.findAll({where: {userId: id}})

        let result = []

        models.map((element) => {
            result.push({id: element.id, name: element.name, createdAt: element.createdAt})
        })

        return result
    }

    async getById(id: number, authHeader: string) {
        const token = authHeader.split(' ')[1]
        const decoded = jwt_decode(token);
        const userId = decoded['id']

        const model = await this.assemblyRepository.findOne({
            where: {id, userId},
            include: [
                DataStorageModel,
                MotherboardModel,
                PowerSupplyModel,
                ProcessorModel,
                ProcessorCoolingModel,
                RamModel,
                VideoCardModel,
            ]
        })

        if(!model) {
            throw new HttpException({error: "Нет доступа"}, HttpStatus.BAD_REQUEST)
        }

        const processor = await this.processorRepository.findOne({
            where: {id: model.processorId},
            include: [
                ProcessorCodeNameModel,
                ProcessorSeriesModel
            ]})

        const dataStorage = await this.dataStorageRepository.findOne({
            where: {id: model.dataStorageId},
            include: [
                TypeDataStorageModel
            ]})

        const motherboard = await this.motherboardRepository.findOne({
            where: {id: model.motherboardId},
            include: [
                SocketModel
            ]})

        const processorCooling = await this.processorCoolingRepository.findOne({
            where: {id: model.processorCoolingId},
            include: [
                TypeProcessorCoolingModel
            ]})

        return {
            name: model.name,
            processor: {
                name:  processor.series.name + ' ' + processor.codeName.name,
                url: processor.url
            },
            dataStorage: {
                name: dataStorage.type.name + ' ' + dataStorage.volume.toString() + 'ГБ',
                url: dataStorage.url
            },
            motherboard: {
                name: motherboard.socket.name,
                url: motherboard.url
            },
            powerSupply: {
                name: model.powerSupply.power.toString() + ' Вт',
                url: model.powerSupply.url
            },
            processorCooling: {
                name: processorCooling.type.name + ' (вентиляторы: ' + processorCooling.numberFans.toString() + ' шт.)',
                url: processorCooling.url
            },
            ram: {
                name: model.ram.name,
                url: model.ram.url
            },
            videoCard: {
                name: model.videoCard.name,
                url: model.videoCard.url
            }
        }
    }
}
