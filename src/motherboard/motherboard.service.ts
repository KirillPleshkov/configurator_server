import {Injectable} from '@nestjs/common';
import {MotherboardCreateSocketDto} from "./dto/motherboard-create-socket.dto";
import {InjectModel} from "@nestjs/sequelize";
import {SocketModel} from "../socket/models/socket.model";
import {MotherboardCreateDto} from "./dto/motherboard-create.dto";
import {MotherboardModel} from "./models/motherboard.model";
import {MotherboardGetDto} from "./dto/motherboard-get.dto";

@Injectable()
export class MotherboardService {

    constructor(@InjectModel(SocketModel) private socketRepository: typeof SocketModel,
                @InjectModel(MotherboardModel) private motherboardRepository: typeof MotherboardModel) {}

    async createSocket(motherboardCreateSocketDto: MotherboardCreateSocketDto) {
        return await this.socketRepository.create(motherboardCreateSocketDto)
    }

    async create(motherboardCreateDto: MotherboardCreateDto) {
        return await this.motherboardRepository.create(motherboardCreateDto)
    }

    async getAllCharacteristics(motherboardGetDto: MotherboardGetDto) {

        let models = []

        if(motherboardGetDto.socketId !== null && motherboardGetDto.socketId !== undefined) {
            models.push(await this.motherboardRepository.findOne({
                where: {socketId: motherboardGetDto.socketId},
                include: SocketModel
            }))
        }
        else {
            models = await this.motherboardRepository.findAll({include: SocketModel})
        }

        let result = []

        models.map((element) => {
            const name = element.socket.name

            result.push({id: element.id, name: name, url: element.url, socketId: element.socketId})
        })

        return result
    }

}
