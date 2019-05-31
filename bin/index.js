#!/usr/bin/env node
const os = require('os');
const http = require('http');
const fs = require('fs');


var interfaces = os.networkInterfaces();

const root = process.cwd();  //当前目录

const port = '8081';

var localIP = getlocalIp()

//获取ip
function getlocalIp(){
	var interfaces = os.networkInterfaces();
	var ipArr = []
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                // return alias.address;
                ipArr.push(alias.address)
            }
        }
    }
    return ipArr
}

//获取文件类型
 function getType(file){
    var filename=file;
    var index1=filename.lastIndexOf(".");
    var index2=filename.length;
    var type=filename.substring(index1+1,index2);
    return type;
 }
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
    var url=req.url;
    var file = root+url;
    fs.readFile(file,function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(`${file}`)
            let fileList =  fs.readdirSync(`${file}`);
            for(let f of fileList){
            	let type = getType(f)
            	if(type=='html'){
            		res.write('<br/>'+`<a href="${f}">${f}</a>`+'\n')
            	}
            }
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();
        }
    })
}).listen(port);

//显示本地服务地址
function setConsoleInfo(){
	console.log('服务已开启')
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