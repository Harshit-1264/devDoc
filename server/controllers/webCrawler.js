import "dotenv/config";
import { embedAndStoreChunks } from "../services/ragService.js";
import { PlaywrightWebBaseLoader } from "@langchain/community/document_loaders/web/playwright";

// For single page crawling and extracting text
export const webCrawler = async (req, res) => {
  try {
    const URL = req.body.URL;
    console.log("Website URL received: ", URL);
    const websiteName = URL.replace(/https?:\/\//, "").split("/")[0];

    const loader = new PlaywrightWebBaseLoader(URL, {
      launchOptions: { headless: true },
      gotoOptions: { waitUntil: "networkidle" },
      evaluate: async (page) => {
        // This function runs in the browser context
        return await page.evaluate(() => {
          const main = document.querySelector("main") || document.body;
          return main.innerText;
        });
      },
    });
    const docs = await loader.load();

    if (!docs || docs.length === 0) {
      return res.status(404).json({ error: "Can't crawl this website" });
    }
    const rawText = docs?.map((doc) => doc.pageContent).join('\n');

    let collectionName = websiteName + Date.now();

    await embedAndStoreChunks(rawText, websiteName, collectionName);
    res.status(200).json({
        status: `${websiteName} extracted and embedded`,
        rawText,
        embeddingName: collectionName
    });
  } catch (error) {
    console.error("Error in webCrawler:", error);
    res.status(500).json({ error: "Failed to crawl the website" });
  }
};
