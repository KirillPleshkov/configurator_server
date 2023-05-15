import {Body, Controller, Post} from '@nestjs/common';
import {ComponentsInfoGetDto} from "./dto/components-info-get.dto";
import {ComponentsInfoService} from "./components-info.service";

@Controller('components-info')
export class ComponentsInfoController {

    constructor(private componentsInfoService: ComponentsInfoService) {}

    @Post('/get-minimal-price')
    getMinimalPrice(@Body() componentsInfoGetDto: ComponentsInfoGetDto) {
        return this.componentsInfoService.getMinimalPrice(componentsInfoGetDto)
    }

    @Post('/get-components-info')
    getComponentsInfo(@Body() componentsInfoGetDto: ComponentsInfoGetDto) {
        return this.componentsInfoService.getComponentsInfo(componentsInfoGetDto)
    }

    @Post('/get-price-info')
    getPriceInfo(@Body() componentsInfoGetDto: ComponentsInfoGetDto) {
        return this.componentsInfoService.getPriceInfo(componentsInfoGetDto)
    }
}
