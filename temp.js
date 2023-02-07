const puppeteer = require("puppeteer");

async function selectFirstMessage(page) {
  await page.goto("https://web.whatsapp.com/");

  // Wait for the page to load
  await page.waitForXPath('//*[@id="app"]/div/div/div[3]');

  const BotGroup = await page.waitForSelector(
    `.ggj6brxn.gfz4du6o.r7fjleex.g0rxnol2.lhj4utae.le5p0ye3.l7jjieqr._11JPr[title="AI test"]`
  );

  BotGroup.click();

  let currentText = "/ask hi chatgpt";

  setInterval(async () => {
    const lastMessage = await page.waitForSelector(
      "#main > div._2gzeB > div > div._5kRIK > div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs > div:last-child > div > div > div.ItfyB._3nbHh > div._27K43 > div.copyable-text > div > span._11JPr.selectable-text.copyable-text > span"
    );
    const updatedText = await page.evaluate(
      (element) => element.textContent,
      lastMessage
    );

    if (updatedText !== currentText) {
      currentText = updatedText;
      console.log("query from whatsapp : " + currentText);
      if (currentText.includes("/ask")) {
        const query = currentText.replace("/ask", "").trim();
        const answer = await fetchAnswer(query);
        console.log(query);
        console.log(answer);
        const inputField = await page.waitForXPath(
          `//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[1]`
        );
        await inputField.type(answer);
        await inputField.press("Enter");
      }
    }
  }, 500);

  /*  currentText = await page.evaluate(
    (element) => element.textContent,
    lastMessage
  ); */
}

/* (async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Select the first message
  await selectFirstMessage(page);
})();
 */
const Youbrowser = await puppeteer.launch({ headless: false });
const Botpage = await Youbrowser.newPage();
await Botpage.goto("https://you.com/search?q=who+are+you&tbm=youchat&cfr=chat");
async function fetchAnswer(question) {
  // Input field selection
  const inputField = await Botpage.waitForSelector(
    "#section > main > div > div > div.sc-c7689318-2.kybaUe > div:nth-child(2) > div > div > li > div.sc-1bad5357-2.cvgjRS > div.sc-24085169-0.dyHEmQ > textarea"
  );
  await inputField.type(question);
  await inputField.press("Enter");

  // Get text content
  const text = await Botpage.waitForXPath(
    '//*[@id="chatHistory"]/div[2]/div[2]/div[1]/p'
  );

  let previousText = "";
  let currentText = "";
  let sameTextCount = 0;

  while (sameTextCount < 5) {
    previousText = currentText;
    currentText = await Botpage.evaluate(
      (element) => element.textContent,
      text
    );
    if (previousText === currentText) {
      sameTextCount++;
    } else {
      sameTextCount = 0;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return currentText;
}

(async () => {
  const answer1 = await fetchAnswer("write a poem about chatgpt");
  console.log("Answer 1:", answer1);
})();
