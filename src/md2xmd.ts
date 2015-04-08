///<reference path="../typings/tsd.d.ts"/>
import marked = require('marked');
var renderer = new marked.Renderer();

var hashes = "######"
renderer.heading = function(text,level) {
  var hash = hashes.substring(0,level);
  return `${hash} ${text}\n\n`;
}

renderer.code = function(code,lang) {
  return `\`\`\`[${lang}]\n${code}\n\`\`\`\n\n`;
}

renderer.blockquote = function(quote) {
  // console.log("quote",JSON.stringify(quote));
  // pretty weird. quote passed to the renderer has 2 untrimmed \n\n.
  return `#blockquote\n  ${quote}`;
}

renderer.paragraph = function(text) {
  return `${text}\n\n`;
}

renderer.html = function(html) {
  return "````\n" + html + "````\n"
}


// inline
renderer.em = function(text) {
  return `_${text}_`;
}

renderer.strong = function(text) {
  return `*${text}*`;
}

renderer.link = function(href: string, title: string, text: string) {
  // FIXME: huh? what's the title for?
  return `[> ${href}][${text}]`;
}

renderer.codespan = function(code) {
  return `\`${code}\``;
}

renderer.list = function(body,ordered) {
  console.log("body",JSON.stringify(body));
  if(ordered) {
    return body.replace(/^\+/,"+1") + "\n";
  } else {
    return body + "\n";
  }
}

renderer.listitem = function(text) {
  // console.log("body",JSON.stringify(body));
  console.log("text",JSON.stringify(text));
  return `+ ${text}\n`;
}

renderer.image = function(href: string, title: string, text: string) {
  var tag = `[! ${href}]`;
  if(text != "") {
    tag += `[${text}]`;
  }
  return tag;
}

function md2xmd(doc:string): string {
  return marked(doc, {renderer: renderer});
}

export = md2xmd;