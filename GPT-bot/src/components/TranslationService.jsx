export async function translateText(text, target) {
  const endpoint = "https://api.cognitive.microsofttranslator.com";
  const route = "/translate?api-version=3.0";
  const url = `${endpoint}${route}&to=${target}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": import.meta.env.VITE_REACT_APP_AZURE_KEY,
      "Ocp-Apim-Subscription-Region": import.meta.env
        .VITE_REACT_APP_AZURE_REGION,
    },
    body: JSON.stringify([{ Text: text }]),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data[0].translations[0].text;
}
