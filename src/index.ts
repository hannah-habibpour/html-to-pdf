const puppeteer = require("puppeteer");

async function generatePDFfromHTML({
  htmlContent,
  outputPath,
}: {
  htmlContent: string;
  outputPath: string;
}) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: "A4" });
  await browser.close();
}

const htmlContent = "<h1>Hello Hannah</h1>";

generatePDFfromHTML({ htmlContent: htmlContent, outputPath: "output.pdf" })
  .then(() => console.log("PDF Generated"))
  .catch((err) => console.error(err));
