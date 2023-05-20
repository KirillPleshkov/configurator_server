import {Injectable} from '@nestjs/common';
import {ProcessorCreateSeriesDto} from "./dto/processor-create-series.dto";
import {InjectModel} from "@nestjs/sequelize";
import {ProcessorSeriesModel} from "./models/processor-series.model";
import {ProcessorCodeNameModel} from "./models/processor-code-name.model";
import {ProcessorCreateCodeNameDto} from "./dto/processor-create-code-name.dto";
import {ProcessorCreateDto} from "./dto/processor-create.dto";
import {ProcessorModel} from "./models/processor.model";
import {ProcessorGetDto} from "./dto/processor-get.dto";

@Injectable()
export class ProcessorService {
    constructor(@InjectModel(ProcessorSeriesModel) private processorSeriesRepository: typeof ProcessorSeriesModel,
                @InjectModel(ProcessorCodeNameModel) private processorCodeNameRepository: typeof ProcessorCodeNameModel,
                @InjectModel(ProcessorModel) private processorRepository: typeof ProcessorModel) {}

    async createSeries(processorCreateSeriesDto: ProcessorCreateSeriesDto) {
        return await this.processorSeriesRepository.create(processorCreateSeriesDto)
    }

    async createCodeName(processorCreateCodeNameDto: ProcessorCreateCodeNameDto) {
        return await this.processorCodeNameRepository.create(processorCreateCodeNameDto)
    }

    async create(processorCreateDto: ProcessorCreateDto) {
        return await this.processorRepository.create(processorCreateDto)
    }

    async getAllCharacteristics(processorGetDto: ProcessorGetDto) {
        const models = await this.processorRepository.findAll({include: [ProcessorCodeNameModel, ProcessorSeriesModel]})

        let result = []

        models.map((element) => {

            const name = element.series.name + ' ' + element.codeName.name

            result.push({url: element.url, id: element.id, name: name})
        })

        return result
    }

}
