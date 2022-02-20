const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


const OpenAI = require('openai-api');
//const OPENAI_API_KEY = "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";
const OPENAI_API_KEY =  "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";
const openai = new OpenAI(OPENAI_API_KEY);

const { Pool } = require('pg');
const { stringify } = require('querystring')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

var answer;
var correct;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  var text; var textCorrect;

  (async () => {
    const gptResponse = await openai.complete({
      engine:"text-davinci-001",
      prompt:"Generate a grammatically incorrect paragraph",
      temperature:1,
      max_tokens:1941,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0
      // bestOf: 1,
      // n: 1,
      // stream: false,
      // stop: ['\n', "testing"]
    });    
    text = gptResponse.data.choices[0].text; console.log(text);

    const gptResponseTwo = await openai.complete({
      engine:"text-davinci-001",
      prompt: `Correct this paragraph: ${text}`,
      temperature:1,
      max_tokens:1941,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0
    });
    
    textCorrect = gptResponseTwo.data.choices[0].text; console.log(textCorrect);
    res.render('pages/main', {input: text, correct: textCorrect});
  })();
})


app.get('/data', (req, res) => {
  var dataQuery = `SELECT * FROM data;`;
  pool.query(dataQuery, (error,result) =>{
    if(error){res.end(error);}    
    var results = {'rows':result.rows}
    console.log(results);
    res.render('pages/submitted', results);
  })
})

app.get('/submit', (req,res) =>{
  console.log("SUBMIT");
  console.log(`SUBMIT: ${answer} ${correct}`);
  res.render('pages/submitted', { a: answer, b: correct});
})

app.post('/data', (req, res) =>{
  let uAnswer = req.body.userAnswer;
  let cAnswer = req.body.correctAnswer;

  answer = req.body.userAnswer;
  correct = req.body.correctAnswer;
  //answer = uAnswer; correct = cAnswer;
  //console.log(`DATA ('${uAnswer}', '${cAnswer}');`);

  /*
  var dataQuery = `INSERT INTO data values ('${uAnswer}', '${cAnswer}');`;
  pool.query(dataQuery, (error,result) =>{
    if(error){res.end(error);}   
  })
  */

  res.redirect('/submit');
  //app.get('/submit', req); 
})



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
