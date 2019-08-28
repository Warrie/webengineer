'use strict';

var 
	fs=require('fs'),
	http=require('http'),
	url=require('url'),
	path=require('path');

var root = path.resolve(process.argv[2]||'.');

console.log('static root dir: ' +root);

var server=http.createServer(function(request,response){
  var pathname=url.parse(request.url).pathname;
	var filepath=path.join(root,pathname);
	fs.stat(filepath,function(err,stats){
	  if(!err&&stats.isFile()){
		  console.log(stats);
		  console.log('200');
		  response.writeHead(200);
		  fs.createReadStream(filepath, 'utf-8').pipe(response);
	  }else{
		console.log('404');
		  response.writeHead(404);
		  response.end('not found');
	  }
	})
})

server.listen(8888);
console.log('start');
