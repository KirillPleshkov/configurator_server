import {Body, Controller, Injectable, Post} from '@nestjs/common';
import {GetPriceDto} from "./dto/get-price.dto";
import {PriceService} from "./price.service";

@Controller('price')
export class PriceController {
    constructor(private priceService: PriceService) {}

    @Post('/get-price')
    getPrice(@Body() getPriceDto: GetPriceDto) {
        return this.priceService.getPrice(getPriceDto)
    }

}
