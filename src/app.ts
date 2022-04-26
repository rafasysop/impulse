import 'dotenv/config'
import express from 'express';

const port = 4000

const app = express();

app.get('/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}`)
})

app.get('/signin/callback', (req, res) => {
  const { code } = req.query

  return res.json(code)
})

app.listen(port, () => console.log(`Server is runnin on ${port}`))
