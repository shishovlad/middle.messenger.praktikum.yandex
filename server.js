// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.static('./dist'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}!`)
})
