import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {AssemblyCreateDto} from "./dto/assembly-create.dto";
import {AssemblyService} from "./assembly.service";
import {JwtAuthGuard} from "../users/guards/jwt-auth.guard";

@Controller('assembly')
export class AssemblyController {

    constructor(private assemblyService: AssemblyService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Body() assemblyCreateDto: AssemblyCreateDto, @Req() req) {
        return this.assemblyService.create(assemblyCreateDto, req.headers.authorization)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() req) {
        return this.assemblyService.getAll(req.headers.authorization)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getById(@Param('id') id: number, @Req() req) {
        return this.assemblyService.getById(id, req.headers.authorization)
    }

}
