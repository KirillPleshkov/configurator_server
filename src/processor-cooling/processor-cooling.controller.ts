import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ProcessorCoolingService} from "./processor-cooling.service";
import {ProcessorCoolingCreationDto} from "./dto/processor.cooling-creation.dto";

@Controller('processor-cooling')
export class ProcessorCoolingController {
    constructor(private processorCoolingService: ProcessorCoolingService) {}

    @Post('/create')
    create(@Body() processorCoolingCreationDto: ProcessorCoolingCreationDto) {
        return this.processorCoolingService.create(processorCoolingCreationDto)
    }

    @Get('/all-characteristics')
    getAllCharacteristics() {
        return this.processorCoolingService.getAllCharacteristics()
    }

}
