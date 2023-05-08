
const express = require('express')
const app = express()

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',// Cache frissítési gyakorisága
  redirect: false
}
app.use(express.static('dist', options))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`GO EVENT! Frontend: http://localhost:${port}`)
})