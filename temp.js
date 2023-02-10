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
      if (!currentText.includes("..:")) {
        const query = currentText;
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
    " #section > main > div > div > div.sc-5e54d835-2.hNDzNs > div:nth-child(2) > div > div > li > div.sc-c5d5838d-2.doEeVo > div.sc-e8e0f785-0.cNJixV > textarea"
  );
  await inputField.type(question);
  await inputField.press("Enter");

  // Get text content
  const text = await Botpage.waitForSelector(
    `#chatHistory > ${
      initiate != null
        ? "div.sc-c159efe6-2.fPZaWV"
        : `div:nth-child(${+message_index})`
    } > div.sc-c159efe6-4.cqUSEl > div.sc-c159efe6-7.hdjlGH`
  );
  console.log("message_index : " + message_index);
  let previousText = "";
  let innerHTML = "";
  let sameTextCount = 0;

  while (sameTextCount < 5) {
    previousText = innerHTML;
    innerHTML = await Botpage.$eval(
      `#chatHistory > ${
        //#chatHistory > div.sc-c159efe6-2.fPZaWV > div.sc-c159efe6-4.cqUSEl > div.sc-c159efe6-7.hdjlGH

        //#chatHistory > div:nth-child(3) > div.sc-c159efe6-4.cqUSEl > div.sc-c159efe6-7.hdjlGH
        initiate != null
          ? "div.sc-c159efe6-2.fPZaWV"
          : `div:nth-child(${+message_index})`
      } > div.sc-c159efe6-4.cqUSEl > div.sc-c159efe6-7.hdjlGH`,
      (element) => element.innerHTML
    );
    if (previousText === innerHTML) {
      sameTextCount++;
    } else {
      sameTextCount = 0;
    }
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  const Htmltext = await Botpage.evaluate((innerHTML) => {
    const div = document.createElement("div");
    div.innerHTML = innerHTML;
    let text = div.textContent;

    // Replace line breaks with new line characters
    text = text.replace(/\n/g, "   ");
    text = text.replace(
      "This answer is helpful and/or accurate. Provide feedback on this result.This answer is not helpful, accurate, and/or safe. Provide feedback on this result.",
      ""
    );

    // Replace list items with bullet points
    text = text.replace(/\n- /g, "\u2028• ");

    return text;
  }, innerHTML);

  return "🤖..:  " + Htmltext;
}

//#chatHistory > div:nth-child(3) > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe
//#chatHistory > div.sc-ec96b016-2.kxQdzz > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe > p
//#chatHistory > div.sc-ec96b016-2.kxQdzz > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe > p
// #chatHistory > div:nth-child(3) > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe > p
//#chatHistory > div.sc-ec96b016-2.kxQdzz > div.sc-ec96b016-4.jLEIOQ
//#chatHistory > div:nth-child(3) > div.sc-ec96b016-4.jLEIOQ
//#chatHistory > div:nth-child(3) > div.sc-ec96b016-4.jLEIOQ
//#chatHistory > div.sc-ec96b016-2.kxQdzz > div.sc-ec96b016-4.jLEIOQ
//#chatHistory > div:nth-child(14) > div.sc-ec96b016-4.jLEIOQ > div.sc-ec96b016-8.hAeOYe
//#chatHistory > div.sc-c159efe6-2.fPZaWV > div.sc-c159efe6-4.cqUSEl
//#chatHistory > div.sc-c159efe6-2.fPZaWV > div.sc-c159efe6-4.cqUSEl > div.sc-c159efe6-7.hdjlGH
