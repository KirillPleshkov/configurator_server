import {Body, Controller, Post} from '@nestjs/common';
import {VideoCardCreateDto} from "./dto/video-card-create.dto";
import {VideoCardService} from "./video-card.service";
import {VideoCardGetDto} from "./dto/video-card-get.dto";

@Controller('video-card')
export class VideoCardController {

    constructor(private videoCardService: VideoCardService) {}

    @Post('/create')
    create(@Body() videoCardCreateDto: VideoCardCreateDto) {
        return this.videoCardService.create(videoCardCreateDto)
    }

    @Post('/all-characteristics')
    getAllCharacteristics(@Body() videoCardGetDto: VideoCardGetDto) {
        return this.videoCardService.getAllCharacteristics(videoCardGetDto)
    }
}
