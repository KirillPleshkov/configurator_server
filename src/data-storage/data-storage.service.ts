import {Injectable} from '@nestjs/common';
import {DataStorageCreateDto} from "./dto/data-storage-create.dto";
import {InjectModel} from "@nestjs/sequelize";
import {DataStorageModel} from "./models/data-storage.model";
import {TypeDataStorageModel} from "./models/type-data-storage.model";


@Injectable()
export class DataStorageService {

    constructor(@InjectModel(DataStorageModel) private dataStorageRepository: typeof DataStorageModel,
                @InjectModel(TypeDataStorageModel) private typeDataStorageRepository: typeof TypeDataStorageModel) {}

    async create(dataStorageCreateDto: DataStorageCreateDto) {

        console.log(dataStorageCreateDto.typeName)

        let type = await this.typeDataStorageRepository.findOne({
            where: {name: dataStorageCreateDto.typeName}
        })

        if(!type) {
            type = await this.typeDataStorageRepository.create({
                name: dataStorageCreateDto.typeName,
                url: dataStorageCreateDto.typeUrl
            })
        }

        return await this.dataStorageRepository.create({
            volume: dataStorageCreateDto.value,
            typeId: type.id,
            parsingId: dataStorageCreateDto.parsingId
        })
    }

    async getAllCharacteristics() {
        const models = await this.dataStorageRepository.findAll({include: TypeDataStorageModel})

        let result = []

        models.map((element, i) => {
            const name = element.type.name + ' ' + element.volume.toString() + 'ГБ'
            result.push({id: element.id, name: name, url: element.url})
        })

        return result
    }
}
