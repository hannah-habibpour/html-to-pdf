const puppeteer = require("puppeteer");
const express = require("express");

const app = express();

// Parse JSON bodies
app.use(express.json());

async function generatePDFfromHTML({ htmlContent }: { htmlContent: string }) {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfbuff = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfbuff;
}

app.post("/generate-pdf", async (req: any, res: any) => {
  try {
    const { htmlContent }: { htmlContent: string } = req.body;
    console.log(htmlContent);
    const pdfbuff = await generatePDFfromHTML({ htmlContent });
    console.log(pdfbuff);
    // Set headers for PDF response
    res.setHeader("Content-Type", "application/pdf");
    console.log(pdfbuff.length);
    res.setHeader("Content-Length", pdfbuff.length);
    res.status(201).end(pdfbuff);
    console.log("PDF generated successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500);
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
