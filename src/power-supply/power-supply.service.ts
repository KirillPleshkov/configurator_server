import {Injectable} from '@nestjs/common';
import {PowerSupplyCreationDto} from "./dto/power-supply-creation.dto";
import {InjectModel} from "@nestjs/sequelize";
import {PowerSupplyModel} from "./models/power-supply.model";
import {PowerSupplyGetDto} from "./dto/power-supply-get.dto";

@Injectable()
export class PowerSupplyService {

    constructor(@InjectModel(PowerSupplyModel) private powerSupplyRepository: typeof PowerSupplyModel) {}

    async create(powerSupplyCreationDto: PowerSupplyCreationDto) {
        return await this.powerSupplyRepository.create(powerSupplyCreationDto)
    }

    async getAllCharacteristics(powerSupplyGetDto: PowerSupplyGetDto) {
        const models = await this.powerSupplyRepository.findAll()

        let result = []

        models.map((element) => {
            const name = element.power.toString() + ' Вт'

            let isBest = false
            if(element.power >= powerSupplyGetDto.power && element.power <= powerSupplyGetDto.power + 100) {
                isBest = true
            }

            result.push({id: element.id, name, isBest, url: element.url, power: element.power})
        })

        result.sort((a, b) =>
            (a.isBest === true && b.isBest === false) ? -1 :
                (b.isBest === true && a.isBest === false) ? 1 :
                    (a.power < b.power) ? -1 : 1
        )

        return result
    }



}
