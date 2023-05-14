import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {DataStorageService} from "./data-storage.service";
import {DataStorageCreateDto} from "./dto/data-storage-create.dto";

@Controller('data-storage')
export class DataStorageController {
    constructor(private dataStorageService: DataStorageService) {}

    @Post('/create')
    create(@Body() dataStorageCreateDto: DataStorageCreateDto) {
        return this.dataStorageService.create(dataStorageCreateDto)
    }

    @Get('/all-characteristics')
    getAllCharacteristics() {
        return this.dataStorageService.getAllCharacteristics()
    }

    @Get('/get-cost/:id')
    getCost(@Param('id') id) {
        return this.dataStorageService.getCost(id)
    }

    @Get('/get-components/:id')
    getComponents(@Param('id') id) {
        return this.dataStorageService.getComponents(id)
    }
}
