import puppeteer from "puppeteer"

export default async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1920, height: 1080 },
        args: [
            '--enable-features=NetworkService',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--shm-size=3gb',
        ],
    })

    const page = (await browser.pages())[0];
    browser.pages
    await page.setCacheEnabled(false)

    return page
}
