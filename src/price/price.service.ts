import { Injectable } from '@nestjs/common';
import {GetPriceDto} from "./dto/get-price.dto";
import * as cheerio from "cheerio";
import axios from 'axios'

@Injectable()
export class PriceService {

    async getPrice(getPriceDto: GetPriceDto) {

        const getHTML = async (url) => {
            const {data} = await axios.get(url)
            return cheerio.load(data)
        }

        const $ = await getHTML(getPriceDto.url)

        let prices = []

        let normalImg = ""

        $('tr.priceElem').each((i, element) => {
            const img = $($(element).find('img')[0]).attr('src')

            const imgStore = 'https://n-katalog.ru' + $($(element).find('img')[1]).attr('src')
            const header = $(element).find('p.where-buy-title').text()
            const storeName = $(element).find('div.it-deliv').text()
            const price = $($(element).find('a')[0]).text()
            const storeUrl = 'https://n-katalog.ru' + $(element).find('a').attr('onmouseover').split('"')[1]

            if(storeName !== "Citilink.ru" && storeName !== "Alt-dim.ru" && storeName !== "DNS-shop.ru")
                normalImg = img

            prices.push({img: img, imgStore: imgStore, header: header, storeName: storeName, price: price, storeUrl: storeUrl})
        })

        prices.map((element) => {
            if(element.storeName === "Citilink.ru" || element.storeName === "Alt-dim.ru" || element.storeName === "DNS-shop.ru")
                element.img = normalImg
        })

        return prices
    }

}
