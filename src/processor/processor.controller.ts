import {Body, Controller, Post} from '@nestjs/common';
import {ProcessorCreateSeriesDto} from "./dto/processor-create-series.dto";
import {ProcessorService} from "./processor.service";
import {ProcessorCreateCodeNameDto} from "./dto/processor-create-code-name.dto";
import {ProcessorCreateDto} from "./dto/processor-create.dto";
import {ProcessorGetDto} from "./dto/processor-get.dto";

@Controller('processor')
export class ProcessorController {

    constructor(private processorService: ProcessorService) {}

    @Post('/create-series')
    createSeries(@Body() processorCreateSeriesDto: ProcessorCreateSeriesDto) {
        return this.processorService.createSeries(processorCreateSeriesDto)
    }

    @Post('/create-code-name')
    createCodeName(@Body() processorCreateCodeNameDto: ProcessorCreateCodeNameDto) {
        return this.processorService.createCodeName(processorCreateCodeNameDto)
    }

    @Post('/create')
    create(@Body() processorCreateDto: ProcessorCreateDto) {
        return this.processorService.create(processorCreateDto)
    }

    @Post('/all-characteristics')
    getAllCharacteristics(@Body() processorGetDto: ProcessorGetDto) {
        return this.processorService.getAllCharacteristics(processorGetDto)
    }

}
