import {HttpException, HttpStatus, Injectable, Param} from '@nestjs/common';
import {ProcessorCoolingCreationDto} from "./dto/processor.cooling-creation.dto";
import {InjectModel} from "@nestjs/sequelize";
import {ProcessorCoolingModel} from "./models/processor-cooling.model";
import {TypeProcessorCoolingModel} from "./models/type-processor-cooling.model";
import puppeteer from "puppeteer";
import {minimal_args} from "../puppeteer.config";
import * as cheerio from "cheerio";

@Injectable()
export class ProcessorCoolingService {

    constructor(@InjectModel(ProcessorCoolingModel) private processorCoolingRepository: typeof ProcessorCoolingModel,
                @InjectModel(TypeProcessorCoolingModel) private typeProcessorCoolingRepository: typeof TypeProcessorCoolingModel) {}

    async create(processorCoolingCreationDto: ProcessorCoolingCreationDto) {

        let type = await this.typeProcessorCoolingRepository.findOne({where: {name: processorCoolingCreationDto.name}})

        if(!type) {
            type = await this.typeProcessorCoolingRepository.create({
                name: processorCoolingCreationDto.name,
                parserId: processorCoolingCreationDto.typeParserId
            })
        }

        return await this.processorCoolingRepository.create({
            numberFans: processorCoolingCreationDto.numberFans,
            parserId: processorCoolingCreationDto.parserId,
            typeId: type.id
        })
    }

    async getAllCharacteristics() {
        const models = await this.processorCoolingRepository.findAll({include: TypeProcessorCoolingModel})

        let result = []

        models.map((element) => {
            const id = element.id
            const name = element.type.name + ' (вентиляторы: ' + element.numberFans.toString() + ' шт.)'
            result.push({id, name})
        })

        return result
    }

    async getCost(id: number) {
        try {

            const model = await this.processorCoolingRepository.findOne({
                include: TypeProcessorCoolingModel,
                where: {id}
            })

            const content = await this.getHtml(model.parserId, model.type.parserId)

            let $ = cheerio.load(content)
            $ = cheerio.load(content)

            const models = $('div.models-price-range')[0]

            console.log(content)

            const cost = parseInt($($(models).find('span')[0]).text())

            return {cost: cost}

        } catch (e) {
            console.log(e)
            throw new HttpException("Нет ответа", HttpStatus.GATEWAY_TIMEOUT)
        }
    }

    async getComponents(id: number) {
        try {
            const model = await this.processorCoolingRepository.findOne({
                include: TypeProcessorCoolingModel,
                where: {id}
            })

            const content = await this.getHtml(model.parserId, model.type.parserId)

            const $ = cheerio.load(content)

            let models = []

            $('div.models-short-div').each((index, element) => {

                console.log(1)

                const img = 'https://n-katalog.ru' + $(element).find('img').attr('src')
                const header = $(element).find('span.u').text()
                let characteristics = []

                $(element).find('div.m-s-f2').children().each((i, e) => {
                    characteristics.push({data: $(e).text().split('\n')[0]})
                })

                const cost = $(element).find('div.models-price-range').text().split('\n')[0]
                const url = 'https://n-katalog.ru' + $(element).find('a').attr('href')

                models.push({img: img, header: header, characteristics: characteristics, cost: cost, url: url})
            })
            return models
        } catch (e) {
            throw e
        }
    }

    private async getHtml(parsingId: number, typeParsingId: number) {

        try {
            const browser = await puppeteer.launch({headless: "new", args: minimal_args})
            const page = await browser.newPage()
            await page.goto('https://n-katalog.ru/category/sistemy-oxlazhdeniya/list?sort=PriceAsc', { waitUntil: 'domcontentloaded' })

            // await page.click('#presetNaznachenie > li:nth-child(3)')
            // await page.click('#presetTip > li:nth-child('+typeParsingId.toString()+')')
            // await page.click('#presetVentilyatorov > li:nth-child('+parsingId.toString()+')')
            //
            // await page.waitForTimeout(1000)
            // await page.click('#tt-info > div.arrow-start > a')
            // await page.waitForTimeout(1500)

            const content = await page.content()

            await page.close()
            await browser.close()

            return content
        } catch (e) {
            throw e
        }
    }
}
