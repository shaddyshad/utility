var fs = require('fs');

var htmlRegex = new RegExp(/.html$/);

var dir = "/home/shaddy/playground/sharehouse/sharehouse/views";

fs.readdir(dir, function(err, _files){
  if(err) throw err;
  //_files containe the files to be remaining
  var html_files = [];
  for(file of _files){
    if(file.match(htmlRegex)){
      html_files.push(file);
    }
  }
  //rename the files
  console.log(`Renaming ${html_files.length} files`);
  for(file of html_files){
    var dot = "html".length;
    var filename = `${dir}/${file}`;
    var rename = filename.substr(0, filename.length - dot);
    rename = `${rename}ejs`;
    fs.rename(filename, rename, function(err){
      if(err) throw err;
    });
  }

  console.log(_files);

});

// console.log(files);
