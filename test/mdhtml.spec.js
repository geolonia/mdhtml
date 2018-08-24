const chai = require('chai');
const assert = chai.assert;
const mdHtml = require('../lib/mdhtml');

const markdown = "# Hello World!"

describe('`toHTML()` should work as expected.', () => {
  it('Title should be as expected.', () => {
    const template = '<!doctype html><html><head><title></title></head><body><div id="md-container"></div></body></html>'
    const result = mdHtml.toHTML(markdown, template).replace(/\n/g, '')
    assert.isTrue(!!result.match(/<title>Hello World!<\/title>/).length);
  });

  it('The contents should be as expected.', () => {
    const template = '<!doctype html><html><head><title></title></head><body><div id="md-container"></div></body></html>'
    const result = mdHtml.toHTML(markdown, template).replace(/\n/g, '')
    assert.isTrue(!!result.match(/<h1 id="helloworld">Hello World!<\/h1>/).length);
  });

  it('Title should be as expected if `<title />` doesn\'t exist.', () => {
    const template = '<!doctype html><html><head></head><body><div id="md-container"></div></body></html>'
    const result = mdHtml.toHTML(markdown, template).replace(/\n/g, '')
    assert.isTrue(!!result.match(/<title>Hello World!<\/title>/).length);
  });

  it('Error should be shown if container doesn\'t exist.', () => {
    const template = '<!doctype html><html><head><title></title></head><body></body></html>'
    const result = mdHtml.toHTML(markdown, template, (message) => {
      return message
    })
    assert.deepEqual('`#md-container` doesn\'t exist in the template.', result);
  });
});
