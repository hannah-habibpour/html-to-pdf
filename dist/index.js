"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
// Parse JSON bodies
app.use(express.json());
function generatePDFfromHTML(_a) {
    return __awaiter(this, arguments, void 0, function* ({ htmlContent }) {
        const browser = yield puppeteer.launch({ headless: "new" });
        const page = yield browser.newPage();
        yield page.setContent(htmlContent);
        const pdfbuff = yield page.pdf({ format: "A4" });
        yield browser.close();
        return pdfbuff;
    });
}
app.post("/generate-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { htmlContent } = req.body;
        console.log(htmlContent);
        const pdfbuff = yield generatePDFfromHTML({ htmlContent });
        console.log(pdfbuff);
        // Set headers for PDF response
        res.setHeader("Content-Type", "application/pdf");
        console.log(pdfbuff.length);
        res.setHeader("Content-Length", pdfbuff.length);
        res.status(201).end(pdfbuff);
        console.log("PDF generated successfully");
    }
    catch (error) {
        console.log("error", error);
        res.status(500);
    }
}));
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
