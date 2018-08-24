#!/usr/bin/env node

'use strict';

const request = require('request')
const url = require('url')
const program = require('commander')
const pkg = require('./package.json')
const mdHtml = require('./lib/mdhtml')

program
  .version(pkg.version)
  .usage('<FILE> [options]')
  .option('-t, --template <FILE|URL>', 'Path or URL of the template.')
  .option('-o, --output <FILE>', 'Path to the output.')
  .parse(process.argv);

const errorHandler = (message) => {
  console.log(`\u001b[31mError:\u001b[0m ${message}`)
  process.exit(1)
}

const markDownFile = program.args[0]
const templateFile = program.template
const outputFile = program.output

if (!markDownFile || !templateFile) {
  program.outputHelp();
  process.exit(1);
}

const markDown = mdHtml.readFile(markDownFile, errorHandler)

if ((url.parse(templateFile)).hostname) {
  request.get({
    url: templateFile,
  }, (error, response, template) => {
    if (error) {
      console.log(error)
      process.exit(1)
    } else if (200 !== response.statusCode) {
      console.log("Please check URL of the template and try again.")
      process.exit(1)
    }
    mdHtml.output(markDown, template, outputFile, errorHandler)
  });
} else {
  const template = mdHtml.readFile(templateFile)
  mdHtml.output(markDown, template, outputFile, errorHandler)
}