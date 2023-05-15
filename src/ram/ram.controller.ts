import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RamService} from "./ram.service";
import {RamCreateDto} from "./dto/ram-create.dto";

@Controller('ram')
export class RamController {
    constructor(private ramService: RamService) {}

    @Get('/all-characteristics')
    getAllCharacteristics() {
        return this.ramService.getAllCharacteristics()
    }

    @Post('/create-ram')
    create(@Body() ramCreateDto: RamCreateDto) {
        return this.ramService.create(ramCreateDto)
    }

    // @Get('/get-cost/:id')
    // getCost(@Param('id') id) {
    //     return this.ramService.getCost(id)
    // }
    //
    // @Get('/get-components/:id')
    // getComponents(@Param('id') id) {
    //     return this.ramService.getComponents(id)
    // }

}