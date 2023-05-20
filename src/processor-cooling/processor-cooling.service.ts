import {Injectable} from '@nestjs/common';
import {ProcessorCoolingCreationDto} from "./dto/processor.cooling-creation.dto";
import {InjectModel} from "@nestjs/sequelize";
import {ProcessorCoolingModel} from "./models/processor-cooling.model";
import {TypeProcessorCoolingModel} from "./models/type-processor-cooling.model";


@Injectable()
export class ProcessorCoolingService {

    constructor(@InjectModel(ProcessorCoolingModel) private processorCoolingRepository: typeof ProcessorCoolingModel,
                @InjectModel(TypeProcessorCoolingModel) private typeProcessorCoolingRepository: typeof TypeProcessorCoolingModel) {}

    async create(processorCoolingCreationDto: ProcessorCoolingCreationDto) {

        let type = await this.typeProcessorCoolingRepository.findOne({where: {name: processorCoolingCreationDto.name}})

        if(!type) {
            type = await this.typeProcessorCoolingRepository.create({
                name: processorCoolingCreationDto.name,
                parserId: processorCoolingCreationDto.typeParserId
            })
        }

        return await this.processorCoolingRepository.create({
            numberFans: processorCoolingCreationDto.numberFans,
            parserId: processorCoolingCreationDto.parserId,
            typeId: type.id,
            url: processorCoolingCreationDto.url
        })
    }

    async getAllCharacteristics() {
        const models = await this.processorCoolingRepository.findAll({include: TypeProcessorCoolingModel})

        let result = []

        models.map((element) => {
            const id = element.id
            const name = element.type.name + ' (вентиляторы: ' + element.numberFans.toString() + ' шт.)'
            const url = element.url
            result.push({id, name, url})
        })

        return result
    }
}
