import puppeteer from "puppeteer"

export default async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1920, height: 1080 },
    })

    const page = (await browser.pages())[0];
    browser.pages
    await page.setCacheEnabled(false)

    return page
}
