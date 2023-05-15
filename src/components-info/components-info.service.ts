import {Injectable} from '@nestjs/common';
import {ComponentsInfoGetDto} from "./dto/components-info-get.dto";
import axios from "axios";
import * as cheerio from "cheerio";

@Injectable()
export class ComponentsInfoService {
    async getMinimalPrice(componentsInfoGetDto: ComponentsInfoGetDto) {
        const getHTML = async (url) => {
            const {data} = await axios.get(url)
            return cheerio.load(data)
        }

        const $ = await getHTML(componentsInfoGetDto.url)

        const models = $('div.models-price-range')[0]

        const minimalPrice = parseInt($($(models).find('span')[0]).text())

        return {minimalPrice}
    }

    async getComponentsInfo(componentsInfoGetDto: ComponentsInfoGetDto) {
        const getHTML = async (url) => {
            const {data} = await axios.get(url)
            return cheerio.load(data)
        }

        const $ = await getHTML(componentsInfoGetDto.url)

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

    async getPriceInfo(componentsInfoGetDto: ComponentsInfoGetDto) {
        const getHTML = async (url) => {
            const {data} = await axios.get(url)
            return cheerio.load(data)
        }

        const $ = await getHTML(componentsInfoGetDto.url)

        let prices = []

        let normalImg = ""

        $('tr.priceElem').each((i, element) => {
            const img = $($(element).find('img')[0]).attr('src')

            const imgStore = 'https://n-katalog.ru' + $($(element).find('img')[1]).attr('src')
            const header = $(element).find('p.where-buy-title').text()
            const storeName = $(element).find('div.it-deliv').text()
            const price = $($(element).find('a')[0]).text()
            const storeUrl = 'https://n-katalog.ru' + $(element).find('a').attr('onmouseover').split('"')[1]

            if (storeName !== "Citilink.ru" && storeName !== "Alt-dim.ru" && storeName !== "DNS-shop.ru")
                normalImg = img

            prices.push({
                img: img,
                imgStore: imgStore,
                header: header,
                storeName: storeName,
                price: price,
                storeUrl: storeUrl
            })
        })

        prices.map((element) => {
            if (element.storeName === "Citilink.ru" || element.storeName === "Alt-dim.ru" || element.storeName === "DNS-shop.ru")
                element.img = normalImg
        })

        return prices
    }
}
