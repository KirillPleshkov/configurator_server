import {Injectable} from '@nestjs/common';
import {VideoCardCreateDto} from "./dto/video-card-create.dto";
import {InjectModel} from "@nestjs/sequelize";
import {VideoCardModel} from "./models/video-card.model";
import {VideoCardGetDto} from "./dto/video-card-get.dto";
import {VideoCardCharacteristicsDto} from "./dto/video-card-characteristics.dto";

@Injectable()
export class VideoCardService {

    constructor(@InjectModel(VideoCardModel) private videoCardRepository: typeof VideoCardModel) {}

    async create(videoCardCreateDto: VideoCardCreateDto): Promise<VideoCardModel> {
        return await this.videoCardRepository.create(videoCardCreateDto)
    }

    async getAllCharacteristics(videoCardGetDto: VideoCardGetDto): Promise<VideoCardCharacteristicsDto[]> {
        const models = await this.videoCardRepository.findAll()

        let result = []

        models.map((element) => {

            let isBest = true

            if(videoCardGetDto.performanceLevel === null && videoCardGetDto.power === null)
                isBest = false

            if(videoCardGetDto.performanceLevel !== null && element.performanceLevel !== videoCardGetDto.performanceLevel) {
                isBest = false
            }
            else if(videoCardGetDto.power !== null && (
                element.recommendedPower < videoCardGetDto.power ||
                element.recommendedPower > videoCardGetDto.power + 100)) {

                isBest = false
            }

            result.push({recommendedPower: element.recommendedPower, name: element.name, id: element.id, url: element.url, isBest, performanceLevel: element.performanceLevel})
        })

        result.sort((a, b) =>
            (a.isBest === true && b.isBest === false) ? -1 :
                (b.isBest === true && a.isBest === false) ? 1 :
                    (a.id < b.id) ? -1 : 1
        )

        return result

    }

}
