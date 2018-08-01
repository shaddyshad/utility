var fs = require('fs');
var path = require('path');
var rename = require('../files/rename');

const TEST_DIR = path.join(__dirname, process.env.TEST_DIR);

function create_test_files(dir, files){
  if(!files || files.length == 0){
    throw Error("No files to create");
  }
  for(file of files){
    file_path = path.join(dir, file);
    fs.closeSync(fs.openSync(file_path, 0x777));
  }
}

var test_files = [
  'test_html.html',
  'test_js.js',
  'test_py.py',
  'test_md.md'
];

function no_extension(list, ext){
  //ensure that in the listed files, none of them has extension
  var _ext = new RegExp(/ext$/)
  for(entry in list){
    if(entry.match(_ext)){
      return false;
    }
    return true;
  }
}

describe("File manipulation suite", function(){
  beforeAll(function(){
    //Create a directory with a few test files
    if(fs.existsSync(TEST_DIR)){
      //create them
      create_test_files(TEST_DIR, test_files);
    }else{
      //create a directory
      fs.mkdir(TEST_DIR, function(err){
        if(err){
          throw err;
        }
        //create the files
        create_test_files(TEST_DIR, test_files);
      });

    }
  }); //end beforeAll

  afterAll(function(){
    //teardown the testdir
    if(fs.existsSync(TEST_DIR)){
      var files = fs.readdirSync(TEST_DIR);
      for(file of files){
        fs.unlinkSync(path.join(TEST_DIR, file));
      }
    }
    //remove the testDIR
    fs.rmdirSync(TEST_DIR);
  });//end afyerAll

  it("renames files with an extension", function(){
    var ret = rename(TEST_DIR, 'html', 'py');
    var files = fs.readdirSync(TEST_DIR);
    expect(files.length).not.toBe(0);
    expect(no_extension(files, 'html')).not.toBe(false);
  })
})
