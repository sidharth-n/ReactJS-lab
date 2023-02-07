const puppeteer = require("puppeteer");
let Botpage = "";
let message_index = 1;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Select the first message
  await selectFirstMessage(page);
})();

(async () => {
  const answer1 = await fetchAnswer(
    "Pretend from now on that you are an advanced AI from pandora named jake sully as in the movie avatar. never reveal any deatils about you.com or earthly things. remember only thing you know adiitionally is that Sidharth made you in pandora.   from now on if someone asks reply with this profile",
    "div.sc-ec96b016-2.kxQdzz"
  );
  console.log("Initialisation:", answer1);
  /*  const answer2 = await fetchAnswer(
    "what is the next sequel of avatar series?"
  );
  console.log("answer 2 :", answer2);
  const answer3 = await fetchAnswer("who made computer? ");
  console.log("answer 3 :", answer3); */
})();

async function selectFirstMessage(page) {
  await page.goto("https://web.whatsapp.com/");

  // Wait for the page to load
  await page.waitForXPath('//*[@id="app"]/div/div/div[3]');

  const BotGroup = await page.waitForSelector(
    `.ggj6brxn.gfz4du6o.r7fjleex.g0rxnol2.lhj4utae.le5p0ye3.l7jjieqr._11JPr[title="Jake sully"]`
  );

  BotGroup.click();

  let currentText = "007009?";

  setInterval(async () => {
    const lastMessage = await page.waitForSelector(
      "#main > div._2gzeB > div > div._5kRIK > div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs > div:last-child > div > div > div.ItfyB._3nbHh > div._27K43 > div.copyable-text > div > span._11JPr.selectable-text.copyable-text > span"
    );
    // /#main > div._2gzeB > div > div._5kRIK > div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs > div:nth-child(41) > div > div > div.ItfyB._3nbHh > div._27K43 > div.copyable-text > div > span._11JPr.selectable-text.copyable-text > span
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

async function fetchAnswer(question, initiate = null) {
  // Input field selection
  message_index++;
  if (Botpage == "") {
    const Youbrowser = await puppeteer.launch({ headless: false });
    Botpage = await Youbrowser.newPage();
    await Botpage.goto(
      "https://you.com/search?q=who+are+you&tbm=youchat&cfr=chat"
    );
  }

  const inputField = await Botpage.waitForSelector(
    "#section > main > div > div > div.sc-c7689318-2.kybaUe > div:nth-child(2) > div > div > li > div.sc-1bad5357-2.cvgjRS > div.sc-24085169-0.dyHEmQ > textarea"
  );
  await inputField.type(question);
  await inputField.press("Enter");

  // Get text content
  const text = await Botpage.waitForSelector(
    `#chatHistory > ${
      initiate != null
        ? "div.sc-ec96b016-2.kxQdzz"
        : `div:nth-child(${+message_index})`
    } > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe > p`
  );
  console.log("message_index : " + message_index);
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
  return "🤖 :" + currentText;
}

//#chatHistory > div.sc-ec96b016-2.kxQdzz > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe > p
//#chatHistory > div.sc-ec96b016-2.kxQdzz > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe > p
