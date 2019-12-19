const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const routeDir = require('./util/path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded())

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page not Found', path: '' })
})

app.listen(3000)
