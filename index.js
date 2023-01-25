require("dotenv").config();

const {Client, GatewayIntentBits} = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// openai
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization:process.env.OPENAI_ORGANAIZATION, apiKey:process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


client.on('messageCreate', async (message) => {
    try{
        if(message.author.bot) return;
        
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Hi, I'm Lixer, completion : ${message.content}`,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
          });
        //   console.log(completion.data.choices[0].text);
          message.reply(completion.data.choices[0].text);
    }
    catch(err){console.log(err);}
});


client.login(process.env.DISCORD_BOT_TOKEN);