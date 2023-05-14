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
            attributes: ['id', 'name'],
        })
    }

    async create(ramCreateDto: RamCreateDto) {
        return await this.ramRepository.create(ramCreateDto)
    }

    async getCost(id: number) {

        try {

            const object = await this.ramRepository.findOne({where: {id: id}})

            const content = await this.getHtml(Math.log2(object.totalVolume))

            const $ = cheerio.load(content)

            const models = $('div.model-price-range')[0]

            const cost = parseInt($($(models).find('span')[0]).text())

            return {cost: cost}

        }
        catch (e) {
            console.log(e)
            throw new HttpException("Нет ответа", HttpStatus.GATEWAY_TIMEOUT)
        }

    }

    async getComponents(id: number) {
        const object = await this.ramRepository.findOne({where: {id: id}})

        const content = await this.getHtml(Math.log2(object.totalVolume))

        const $ = cheerio.load(content)

        let models = []

        $('div.model-short-div').each((index, element) => {
            const img = 'https://n-katalog.ru' + $(element).find('img').attr('src')
            const header = $(element).find('span.u').text()
            let characteristics = []

            $(element).find('div.m-s-f2').children().each((i, e) => {
                characteristics.push({data: $(e).text().split('\n')[0]})
            })

            const cost = $(element).find('div.model-price-range').text().split('\n')[0]
            const url = 'https://n-katalog.ru' + $(element).find('a').attr('href')

            models.push({img: img, header: header, characteristics: characteristics, cost: cost, url: url})
        })
        return models
    }

    private async getHtml(value: number) {
        try {
            const browser = await puppeteer.launch({headless: "new", args: minimal_args})
            const page = await browser.newPage()
            await page.goto('https://n-katalog.ru/category/operativnaya-pamyat/list?sort=PriceAsc', { waitUntil: 'domcontentloaded' })

            await page.click('#presetKolVoPlanokVKomplekte > li:nth-child(1) > label')
            await page.click('#presetTipPamyati > li:nth-child(2) > label')
            await page.click('#presetObemPamyatiKomplekta > li:nth-child(' + value + ') > label')

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
