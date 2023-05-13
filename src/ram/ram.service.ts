import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RamModel} from "./models/ram.model";
import {RemGetCostDto} from "./dto/rem-get-cost.dto";
import {RamCreateDto} from "./dto/ram-create.dto";
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'


@Injectable()
export class RamService {
    constructor(@InjectModel(RamModel) private ramRepository: typeof RamModel) {}

    getAllCharacteristics() {
        return  {result: [
                {value: 4, name: "DDR4 4Гб"},
                {value: 8, name: "DDR4 8Гб"},
                {value: 16, name: "DDR4 16Гб"},
                {value: 32, name: "DDR4 32Гб"},
                {value: 64, name: "DDR4 64Гб"},
            ]};
    }

    async getCost(remGetCostDto: RemGetCostDto) {

        try {
            const content = await this.getHtml(Math.log2(remGetCostDto.value))

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

    async create(ramCreateDto: RamCreateDto) {
        return await this.ramRepository.create(ramCreateDto)
    }

    async getComponents(remGetCostDto: RemGetCostDto) {
        const content = await this.getHtml(Math.log2(remGetCostDto.value))

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

        const minimal_args = [
            '--autoplay-policy=user-gesture-required',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-domain-reliability',
            '--disable-extensions',
            '--disable-features=AudioServiceOutOfProcess',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-notifications',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-popup-blocking',
            '--disable-print-preview',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-setuid-sandbox',
            '--disable-speech-api',
            '--disable-sync',
            '--hide-scrollbars',
            '--ignore-gpu-blacklist',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-sandbox',
            '--no-zygote',
            '--password-store=basic',
            '--use-gl=swiftshader',
            '--use-mock-keychain',
        ];

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
