/*!
  Copyright (c) 2018 Xu Tongbao
  Licensed under the MIT License (MIT), see
  https://github.com/xutongbao/hello
*/
/* global define */
const fs = require('fs')

const removeDir = (path) => {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file) => {
      let currentPath = path + '/' + file
      if (fs.statSync(currentPath).isDirectory()) {
        removeDir(currentPath)
      } else {
        fs.unlinkSync(currentPath) //删除文件
      }
    })
    fs.rmdirSync(path)  //删除文件夹，只能删除空文件夹
  }
}
module.exports = {
  removeDir
};