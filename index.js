const express = require('express')
const OpenAI = require('openai');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 5000

const openai = new OpenAI({
	apiKey: process.env.Apikey
});




app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res)=>{
	const {title, content} = req.body

	 const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `You know everything about scoring IELTS essays. You assess the given essay  ${content} of the given question ${title} in terms of IELTS Writing Criteria and essay sentences count, paragraphs count, and list the used academic words, and provide feedback and show grammar and spelling errors.You must follow this JSON output : 
      {
        "Band": "band",
        "Sentences": "sentences",
        "Paragraphs": "paragraphs",
        "Feedback": "feedback",
        "TaskAchievement": "taskachievement feedback",
        "CoherenceCohesion": "coherence&cohesion feedback",
        "GrammarRange": "grammarRange feedback",
        "LexicalResource": "lexicalResources feedback",
        "AcademicWord"={["academicWords"]},
      }
    `,
    max_tokens: 900,
    temperature: 0,
  });
  
   res.json(completion.choices[0].text)
})

app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`)
})

