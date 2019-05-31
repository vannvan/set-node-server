/*
* @Author: wanwan
* @Date:   2019-05-31 16:46:51
* @Last Modified by:   wanwan
* @Last Modified time: 2019-05-31 17:14:41
*/
var fs = require('fs')

function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}

//文件类型
function getType(filename){
    var index=filename.lastIndexOf(".");
    if(index!=-1){
    	var type=filename.substring(index+1,filename.length);
	    return type;
    }
}


//遍历读取文件 
function readFile(path, filesList) {
    files = fs.readdirSync(path);//需要用到同步读取 
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
            //创建一个对象保存信息 
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位 
            obj.name = file;//文件名 
            // obj.path = path + '/' + file; //文件绝对路径 
            obj.type = getType(file)
            filesList.push(obj);
        }
    }
}


function countFileByType(obj){
	var keyContainer = {}; // 针对键type进行归类的容器
	obj.forEach(item => {
	  keyContainer[item.type] = keyContainer[item.type] || [];
	  keyContainer[item.type].push(item);
	});
	return keyContainer
}
 

module.exports.geFileList = geFileList

module.exports.countFile = countFileByType

module.exports.getType = getType


