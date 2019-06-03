const os = require('os');
const getlocalIp = () => {
	var interfaces = os.networkInterfaces();
	var ipArr = []
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                ipArr.push(alias.address)
            }
        }
    }
    return ipArr
}


const getWlanIp = () => {
    var interfaces = os.networkInterfaces().WLAN
    var WlanIp = ''
    for(let ip of interfaces){
        if(ip.family=='IPv4'){
            WlanIp = ip.address
        }
    }
    return WlanIp
}

module.exports.getlocalIp = getlocalIp

module.exports.getWlanIp = getWlanIp 
