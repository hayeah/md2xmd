
import minimist = require("minimist");
import fs = require("fs");
import md2xmd = require("./md2xmd");

export = main;

function help() {
  var doc = `
md2xmd [md_file]

Converts a markdown file to extensible markdown format. Reads from standard input by default.

  -h, --help      show help
`
  console.log(doc);
  process.exit(0);
}

interface Args extends minimist.ParsedArgs {
  h?: boolean;
  help?: boolean;
}

function main() {
  var args = <Args>minimist(process.argv.slice(2),{
    alias: {
      "h": ["help"],
    },
    boolean: ["help"]
  });

  if(args.help == true) {
    help();
  }

  var srcInput: NodeJS.ReadableStream;
  if(args._.length == 0) {
    srcInput = process.stdin;
  } else {
    var path = args._[0];
    srcInput = fs.createReadStream(path,"utf8");
  }

  readInput(srcInput,(err,src) => {
    if(err) {
      console.log(err);
      process.exit(1);
    }

    console.log(md2xmd(src));
  });


}

function readInput(stream:NodeJS.ReadableStream,cb: (err,src?:string) => void) {
  var src = "";
  stream.on("readable",() => {
    if(src != null) {
      src += stream.read();
    }
  });

  stream.on("error",(err) => {
    cb(err);
  });

  stream.on("end",() => {
    cb(null,src);
  });
}


