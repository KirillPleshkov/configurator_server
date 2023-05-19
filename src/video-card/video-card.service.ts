import {Injectable} from '@nestjs/common';
import {VideoCardCreateDto} from "./dto/video-card-create.dto";
import {InjectModel} from "@nestjs/sequelize";
import {VideoCardModel} from "./models/video-card.model";
import {VideoCardGetDto} from "./dto/video-card-get.dto";

@Injectable()
export class VideoCardService {

    constructor(@InjectModel(VideoCardModel) private videoCardRepository: typeof VideoCardModel) {}

    async create(videoCardCreateDto: VideoCardCreateDto) {
        return await this.videoCardRepository.create(videoCardCreateDto)
    }

    async getAllCharacteristics(videoCardGetDto: VideoCardGetDto) {
        const models = await this.videoCardRepository.findAll()

        let result = []

        models.map((element) => {

            let isBest = false
            if(element.recommendedPower >= videoCardGetDto.power && element.recommendedPower <= videoCardGetDto.power + 100) {
                isBest = true
            }

            result.push({recommendedPower: element.recommendedPower, name: element.name, id: element.id, url: element.url, isBest})
        })

        result.sort((a, b) =>
            (a.isBest === true && b.isBest === false) ? -1 :
                (b.isBest === true && a.isBest === false) ? 1 :
                    (a.id < b.id) ? -1 : 1
        )

        return result

    }

}
