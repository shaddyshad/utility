var fs = require('fs');
var fs = require('path');


//rename all files in the dir, with the pattern pattern with the
function rename_all_file_extension(dir, extension, replacement){
  var _dir = path.resolve(path.normalize(dir));
  var _ext = new RegExp(/.extension/);
  fs.readdir(_dir, function(err, _files){
    if(err) throw err;
    var files = [];

    for(file of _files){
      if(file.match(_ext)){
        files.push(file);
      }
    }

    //rename the files
    console.log(`Renaming ${files.length} files in ${_dir}`);
    for(file of files){
      var filename = path.join(_dir, file);
      var replace = filename.substr(0, filename.length - _ext.length);
      rename = `${replace}replacement`;
      fs.rename(filename, replace, function(err){
        if(err) throw err;
      });
    }
  });

  return true;
}
