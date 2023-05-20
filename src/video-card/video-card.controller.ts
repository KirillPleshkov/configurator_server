import {Body, Controller, Post} from '@nestjs/common';
import {VideoCardCreateDto} from "./dto/video-card-create.dto";
import {VideoCardService} from "./video-card.service";
import {VideoCardGetDto} from "./dto/video-card-get.dto";
import {VideoCardModel} from "./models/video-card.model";
import {VideoCardCharacteristicsDto} from "./dto/video-card-characteristics.dto";

@Controller('video-card')
export class VideoCardController {

    constructor(private videoCardService: VideoCardService) {}

    @Post('/create')
    create(@Body() videoCardCreateDto: VideoCardCreateDto): Promise<VideoCardModel> {
        return this.videoCardService.create(videoCardCreateDto)
    }

    @Post('/all-characteristics')
    getAllCharacteristics(@Body() videoCardGetDto: VideoCardGetDto): Promise<VideoCardCharacteristicsDto[]> {
        return this.videoCardService.getAllCharacteristics(videoCardGetDto)
    }
}
