"use strict";
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

const port = 7777
app.listen(port, ()=>console.log('listening on port', port))
