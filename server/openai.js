var debug = require('debug')('server:openai');
var OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateSessionParams(previousThemes="", fakeThemeCount=3, playerCount=8) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
            
                {
                    role: "system",
                    content: "Generate parameters for the described game. Only respond in json objects with key-value pairs. Use arrays for keys requiring several values. Use the numbers provided in the explanation from the user rather than follow numbers in given examples through the assistant."
                },
                {
                    role: 'assistant',
                    content: '{"real_theme": "space", "fake_themes": ["planets", "astronomy", "galaxy"], "real_prompts": ["nebula", "alien", "astronaut", "star", "spacecraft"], "imposter_prompt": "ocean"}'
                },
                {
                    role: 'assistant',
                    content: '{"real_theme": "superheroes", "fake_themes": ["villains", "comics", "powers", "secret identity", "capes"], "real_prompts": ["superman", "spiderman", "batman", "wonder woman", "iron man"], "imposter_prompt": "zoo"}'
                },
                {
                    role: "user",
                    content: `The game requires a theme. The real theme cannot be related to: ${previousThemes}. All players should receive a prompt related to the theme, except the imposter, who receives an unrelated prompt. The imposter prompt should however be kept in the same general area as the others - if everyone else is drawing people from somewhere, the impostor should also draw a person, but from some completely different context. Additionally, the game requires fake themes. The fake themes should be close enough to some of the real prompts to be misleading, but only the real theme can fit all the prompts. Synonyms and words closely related to the real theme (sketch and paint are too close) cannot be fake themes. The following keys must be part of the response: real_theme, fake_themes, real_promts, imposter_prompt. There should be ${fakeThemeCount} fake themes. There should be ${playerCount-1} real prompts`,
                },
            ],
        });

        var session_params = JSON.parse(completion.choices[0].message.content);
        debug("Generated session params:");
        debug(session_params);
        return session_params;

    } catch (error) {
        debug('Error occurred:', error);
        throw new Error(error);
    }
}

async function generateUsername() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
            
                {
                    role: "system",
                    content: "To the point, respond with the requested username and no more. All lowercase. Spaces should be replaced by underscore."
                },
                {
                    role: 'assistant',
                    content: 'elegant_zebra'
                },
                {
                    role: "user",
                    content: "Generate a username consisting of one positive adjective and one animal.",
                },
            ],
        });

        var generated_username = completion.choices[0].message.content;
        debug("Generated username: ", generated_username);
        return generated_username;

    } catch (error) {
        debug('Error occurred:', error);
        throw new Error(error);
    }
}

exports.generateSessionParams = generateSessionParams;
exports.generateUsername = generateUsername;