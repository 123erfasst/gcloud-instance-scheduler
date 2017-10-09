'use strict';

const express = require('express');
const app = express();
const handler = require('./handler');

app.get('/start/:instances', (req, res) => handler(req, res, 'start'));
app.get('/stop/:instances', (req, res) => handler(req, res, 'stop'));