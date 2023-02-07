const puppeteer = require("puppeteer");

async function selectFirstMessage(page) {
  await page.goto("https://web.whatsapp.com/");

  // Wait for the page to load
  await page.waitForXPath('//*[@id="app"]/div/div/div[3]');

  const BotGroup = await page.waitForSelector(
    `.ggj6brxn.gfz4du6o.r7fjleex.g0rxnol2.lhj4utae.le5p0ye3.l7jjieqr._11JPr[title="AI test"]`
  );

  BotGroup.click();
  const lastMessage = await page.waitForXPath(
    "/html/body/div[1]/div/div/div[4]/div/div[2]/div/div[2]/div[3]/div[7]/div/div/div[1]/div[1]/div[1]/div/span[1]/span"
  );
  currentText = await page.evaluate(
    (element) => element.textContent,
    lastMessage
  );
  console.log(currentText);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Select the first message
  await selectFirstMessage(page);
})();

async function fetchAnswer(question) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://you.com/search?q=who+are+you&tbm=youchat&cfr=chat");

  // Input field selection
  const inputField = await page.waitForXPath(
    "/html/body/div[1]/div/div/div/div[2]/section/main/div/div/div[1]/div[2]/div/div/li/div[2]/div[1]/textarea"
  );
  await inputField.type(question);
  await inputField.press("Enter");

  // Get text content
  const text = await page.waitForXPath(
    '//*[@id="chatHistory"]/div[2]/div[2]/div[1]/p'
  );

  let previousText = "";
  let currentText = "";
  let sameTextCount = 0;

  while (sameTextCount < 5) {
    previousText = currentText;
    currentText = await page.evaluate((element) => element.textContent, text);
    if (previousText === currentText) {
      sameTextCount++;
    } else {
      sameTextCount = 0;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  await browser.close();
  return currentText;
}

/* (async () => {
  const answer1 = await fetchAnswer("write a poem about chatgpt");
  console.log("Answer 1:", answer1);

  const answer2 = await fetchAnswer("who is the CEO of Twitter");
  console.log("Answer 2:", answer2);
})();
 */
