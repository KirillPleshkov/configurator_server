import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {DataStorageCreateDto} from "./dto/data-storage-create.dto";
import {InjectModel} from "@nestjs/sequelize";
import {DataStorageModel} from "./models/data-storage.model";
import {TypeDataStorageModel} from "./models/type-data-storage.model";
import puppeteer from "puppeteer";
import {minimal_args} from "../puppeteer.config";
import * as cheerio from "cheerio";

@Injectable()
export class DataStorageService {

    constructor(@InjectModel(DataStorageModel) private dataStorageRepository: typeof DataStorageModel,
                @InjectModel(TypeDataStorageModel) private typeDataStorageRepository: typeof TypeDataStorageModel) {}

    async create(dataStorageCreateDto: DataStorageCreateDto) {

        let type = await this.typeDataStorageRepository.findOne({
            where: {name: dataStorageCreateDto.typeName}
        })

        if(!type) {
            type = await this.typeDataStorageRepository.create({
                name: dataStorageCreateDto.typeName,
                url: dataStorageCreateDto.typeUrl
            })
        }

        return await this.dataStorageRepository.create({
            volume: dataStorageCreateDto.value,
            typeId: type.id,
            parsingId: dataStorageCreateDto.parsingId
        })
    }

    async getAllCharacteristics() {
        const models = await this.dataStorageRepository.findAll({include: TypeDataStorageModel})

        let result = []

        models.map((element, i) => {
            const name = element.type.name + ' ' + element.volume.toString() + 'ГБ'
            result.push({id: element.id, name: name})
        })

        return result
    }

    async getCost(id: number) {

        try {

            const model = await this.dataStorageRepository.findOne({include: TypeDataStorageModel, where: {id}})

            const content = await this.getHtml(model.type.url, model.parsingId, model.type.name)

            const $ = cheerio.load(content)

            const models = $('div.models-price-range')[0]

            const cost = parseInt($($(models).find('span')[0]).text())

            return {cost: cost}

        }
        catch (e) {
            console.log(e)
            throw new HttpException("Нет ответа", HttpStatus.GATEWAY_TIMEOUT)
        }

    }

    async getComponents(id: number) {

        const model = await this.dataStorageRepository.findOne({include: TypeDataStorageModel, where: {id}})

        const content = await this.getHtml(model.type.url, model.parsingId, model.type.name)

        const $ = cheerio.load(content)

        let models = []

        $('div.models-short-div').each((index, element) => {
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
    }


    private async getHtml(url: string, parsingId: number, typeName: string) {

        try {
            const browser = await puppeteer.launch({headless: "new", args: minimal_args})
            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'domcontentloaded' })

            await page.click('#preset_t_Obem')
            await page.click('#presetObem > li:nth-child('+parsingId+')')

            await page.waitForTimeout(500)
            await page.click('#tt-info > div.arrow-start > a')
            await page.waitForTimeout(500)

            const content = await page.content()

            await page.close()
            await browser.close()

            return content
        } catch (e) {
            throw e
        }
    }
}
