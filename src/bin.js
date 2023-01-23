require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.YOUR_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

class Bin {
  async run() {
    // console.log("configuration", configuration);
    const openai = new OpenAIApi(configuration);
    // await this.listEngines(openai)
    await this.createCompletition(openai);
  }
  async listEngines(openai) {
    const response = await openai.listEngines();
    console.log(response.data);
  }
  async createCompletition(openai) {
    const msg = "Tengo una piscina armable de 2.39 x 1.50 quisiera saber si me sirve este cobertor?";
    // const categories = [
    //   "Toallas",
    //   "Cobertores",
    //   "Productos Químicos",
    //   "Kit de limpieza",
    //   "Otros productos",
    // ];
    const categories = [
      "precio",
      "tamaños",
      "datos tècnicos",
      "delivery",
      "productos",
      "saludo simple",
    ];
    const prompt = `Tengo las siguientes categorías: ${categories.join(", ")}.
    ¿El siguiente mensaje a qué categoría o categorías pertenece de los mencionados? "${msg}" Responde en una o 3 palabras máximo con la respuesta entre comillas. Si hay más de una categoría que cada uno esté entre sus propias categoró`;
    console.log("prompt:", prompt);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 27, // Hasta 4000 para text-davinci-003 y 2048 para el resto
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      // stop: "\n",
    });
    console.log(response.data);
    console.log("Respuesta:", response.data.choices[0].text);
  }
}

const instanceBin = new Bin();
instanceBin.run();

module.exports = instanceBin;
