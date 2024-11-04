const puppeteer = require('puppeteer');

// Array of ad links
const ads = [
    "https://www.profitablecpmrate.com/b8n9m5k1?key=49d1b07c7f86d580f8d82619ffc2c9c7",
    "https://www.profitablecpmrate.com/b6gkcf2aa8?key=a342eb1837eb747b7a48c4a55ca5dc66",
    "https://www.profitablecpmrate.com/pmy3b5m27r?key=a1a01ca4cf215de9523bf26ddc5532a8",
    "https://www.profitablecpmrate.com/zzse4wbzy1?key=05a1b5039f489d7a0d56be1584005f1f",
    "https://www.profitablecpmrate.com/zb7muzm5yw?key=5d840a68ab542f32850f5f1ec5bcc061",
    "https://www.profitablecpmrate.com/j3d6dv5s?key=3af9ee2141841b4a86a8303c7873c4aa",
    "https://www.profitablecpmrate.com/xjwhfrene?key=b90e7ca701cbac772a9bae4c8ab9f01f"
];

// Delay time between opening each URL (in milliseconds)
const delayBetweenAds = 10000; // 10 seconds

async function openAd(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        console.log(`Opened ad: ${url}`);
    } catch (error) {
        console.error(`Failed to open ad: ${url}`, error);
    } finally {
        await browser.close();
    }
}

async function startBot() {
    let currentAdIndex = 0;

    setInterval(async () => {
        const adUrl = ads[currentAdIndex];
        await openAd(adUrl);

        // Cycle to the next ad URL
        currentAdIndex = (currentAdIndex + 1) % ads.length;
    }, delayBetweenAds);
}

startBot();
