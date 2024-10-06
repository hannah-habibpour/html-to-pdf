const puppeteer = require("puppeteer");
const express = require("express");

const app = express();

// Parse JSON bodies
app.use(express.json());

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

// const htmlContent = "<h1>Hello Hannah</h1>";

// generatePDFfromHTML({ htmlContent: htmlContent, outputPath: "output.pdf" })
//   .then(() => console.log("PDF Generated"))
//   .catch((err) => console.error(err));

app.post("/generate-pdf", async (req: any, res: any) => {
  try {
    const {
      htmlContent,
      outputPath,
    }: { htmlContent: string; outputPath: string } = req.body;
    await generatePDFfromHTML({ htmlContent, outputPath });
    res.status(201).send({ success: true, message: "PDF Generated" });
  } catch (error) {
    res.status(500);
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
