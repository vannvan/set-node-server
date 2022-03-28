#!/usr/bin/env node
const os = require('os')
const http = require('http')
const fs = require('fs')

class SetNodeServer {
  constructor() {
    this.root = process.cwd() //当前目录
    this.port = '8081'
    this.localIP = []
  }

  start() {
    this.localIP = this.getlocalIp()
    this.setHttpServer()
  }

  getlocalIp() {
    const interfaces = os.networkInterfaces()
    let ipArr = []
    for (let devName in interfaces) {
      let iface = interfaces[devName]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          ipArr.push(alias.address)
        }
      }
    }
    return ipArr
  }

  getFileType() {
    let filename = file
    let index1 = filename.lastIndexOf('.')
    let index2 = filename.length
    let type = filename.substring(index1 + 1, index2)
    return type
  }

  async setHttpServer() {
    await this.setConsoleInfo()
    await fs.exists('index.html', (exists) => {
      if (!exists) {
        this.openDefaultBrowser(`http://` + this.localIP[0] + ':' + this.port)
      } else {
        this.openDefaultBrowser(`http://` + this.localIP[0] + ':' + this.port + '/index.html')
      }
    })
  }

  setConsoleInfo() {
    console.log('服务已开启')
    for (let dev of this.localIP) {
      console.log(`${dev}` + ':' + this.port)
    }
  }

  openDefaultBrowser() {
    //
  }
}

const snd = new SetNodeServer()
snd.start()
