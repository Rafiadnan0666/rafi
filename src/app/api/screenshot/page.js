import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { url } = req.body;

    if (!url || !url.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    return res.status(200).json({
      screenshot: `data:image/png;base64,${screenshotBuffer.toString('base64')}`
    });

  } catch (error) {
    console.error('Screenshot error:', error);
    return res.status(500).json({
      error: 'Failed to generate screenshot',
      details: error.message
    });
  }
}