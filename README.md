# @tilecloud/mdhtml

This is a command line tool to convert Markdown file to HTML with template.

## Usage

```
$ mdhtml --help

  Usage: mdhtml <FILE> [options]

  Options:

    -V, --version              output the version number
    -t, --template <FILE|URL>  Path or URL of the template.
    -o, --output <FILE>        Path to the output.
    -h, --help                 output usage information
```

## Example

Output HTML to STDOUT generated from `README.md` with template `template.html`.

```
$ mdhtml README.md -t template.html
```

Save HTML into `index.html`.

```
$ mdhtml README.md -t template.html -o index.html
```

You can get template from remote server.

```
$ mdhtml README.md -t https://example.com/template.html -o index.html
```

## Template specification.


The basic template should be like following.

```
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title></title>
  </head>
  <body>
    <div id="md-container">
    </div>
  </body>
</html>
```

Actually, it is very simple.

* The contents generated from the markdown will be inserted into the `#md-container` element.
* The title will be generated from the first `<h1 />` element.