#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const Ip = require('../lib/get-ip')
const F = require('../lib/get-file')
const root = process.cwd();  //当前目录
const port = Math.floor(Math.random () * 1000) + 8000;

var localIP = Ip.getlocalIp()

//创建本地服务
async function setHttpServer() {
	await setConsoleInfo();
	await fs.exists('index.html',function(exists){
	if(!exists){
			openDefaultBrowser(`http://`+localIP[0]+':'+port)
	  	}else{
			openDefaultBrowser(`http://`+localIP[0]+':'+port+'/index.html')
	  	}
	})
}

var server=http.createServer(function(req,res){
    if(req.url === '/favicon.ico') {
        // console.log('\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m')
    }else{
        var url=req.url;
        var file = root+url;
        fs.readFile(file,function(err,data){
            if(err){
                res.writeHeader(404,{
                    'content-type' : 'text/html;charset="utf-8"'
                });
                if(!F.countFile(F.geFileList(root)).html){
                    res.write('<h1>404页面</h1><p><h2>当前目录没有html文件</h2>')
                }else{
                    let fileList =  fs.readdirSync(`${file}`);
                    for(let f of fileList){
                        let type = F.getType(f)
                        if(type=='html'){
                            res.write('<br/>'+`<a href="${f}">${f}</a>`+'\n')
                        }
                    }
                }
                res.end();
            }else{
                var surl = '.'+url;
                var type = surl.substr(surl.lastIndexOf(".")+1,surl.length)
                res.writeHeader(200,{
                    'content-type' : "text/"+type+';'+'charset="utf-8"'
                });
                res.write(data);
                res.end();
            }
        })  
    } 
}).listen(port);



//显示本地服务地址
function setConsoleInfo(){
  let info = 'The default service has been opened in the browser!'
	console.log('\033[42;30m DONE \033[;32m' + info + '\033[0m')
	for(let dev of localIP){
		console.log(`${dev}`+':'+port)
	}

}


//自动打开浏览器
function openDefaultBrowser(url) {
  var exec = require('child_process').exec;
  // console.log(process.platform)
  switch (process.platform) {
    case "darwin":
      exec('open ' + url);
      break;
    case "win32":
      exec('start ' + url);
      break;
    default:
      exec('xdg-open', [url]);
  }
}

setHttpServer();


