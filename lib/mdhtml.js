'use strict';

const fs = require('fs')
const JSDOM = require('jsdom').JSDOM
const showdown = require('showdown')

exports.toHTML = (markDown, template, errorHandler) => {
  const converter = new showdown.Converter()

  const {document} = (new JSDOM(template)).window;
  const container = document.querySelector('#md-container')

  if (container) {
    const html = converter.makeHtml(markDown)
    container.innerHTML = html
    document.title = (new JSDOM(html)).window.document.querySelector('h1').textContent

    return document.documentElement.outerHTML
  } else {
    return errorHandler("`#md-container` doesn't exist in the template.")
  }
}

exports.output = (markDown, template, outputFile, errorHandler) => {
  const html = this.toHTML(markDown, template, errorHandler)
  if (outputFile) {
    try {
      fs.writeFileSync(outputFile, html, {encoding: 'utf-8'})
    } catch (e ) {
      return errorHandler(`No such file or directory.`)
    }
  } else {
    console.log(html)
  }
}

exports.isFile = (file) => {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    return false
  }
}

exports.readFile = (file, errorHandler) => {
  if (this.isFile(file)) {
    return fs.readFileSync(file, 'utf-8')
  } else {
    return errorHandler(`\`${file}\` doesn't exist.`)
  }
}