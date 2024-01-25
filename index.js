const express = require('express')
const OpenAI = require('openai');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || "https://backend-essay.up.railway.app/";


const openai = new OpenAI({
	apiKey: process.env.Apikey
});




app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res)=>{
    res.send('Hello')
})


app.post('/check', async (req, res)=>{
	const {title, content} = req.body

	 const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Can you check the following IELTS writing Task 2 essay  ${content} of the given question ${title}, give feedback and tell me my mistakes. Also, I want you to mark my essay as an ILETS writing examiner and provide the score breakdown in terms of Task achievement, Lexical Resources, grammatical range and accuracy, and coherence and cohesion, and list the used academic words.You must follow this JSON output : 
      {
        "Band": "band/9",
        "Feedback": "feedback",
        "TaskAchievement": "taskachievement feedback",
        "CoherenceCohesion": "coherence&cohesion feedback",
        "GrammarRange": "grammarRange feedback",
        "LexicalResource": "lexicalResources feedback",
        "AcademicWord"={["academicWords"]}      
	}
    `,
    max_tokens: 900,
    temperature: 0,
  });
  
   res.json(completion.choices[0].text)
})





server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
