# Markdown to xMarkdown Converter

This is very rough, and at the moment only goes as far as satisfying my own needs.

# Install

```
npm install md2xmd
```

# Usage

From command line:

```
$ md2xmd foo.md > foo.xmd
```

Or with code:

```
var md2xmd = require("md2xmd");
var src = fs.readFileSync("foo.md","utf8");
console.log(md2xmd(src));
```
