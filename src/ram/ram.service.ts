import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RamModel} from "./models/ram.model";
import {RamCreateDto} from "./dto/ram-create.dto";
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import {minimal_args} from "../puppeteer.config";


@Injectable()
export class RamService {
    constructor(@InjectModel(RamModel) private ramRepository: typeof RamModel) {}

    async getAllCharacteristics() {

        return await this.ramRepository.findAll({
            attributes: ['id', 'name', 'url'],
        })
    }

    async create(ramCreateDto: RamCreateDto) {
        return await this.ramRepository.create(ramCreateDto)
    }
}
