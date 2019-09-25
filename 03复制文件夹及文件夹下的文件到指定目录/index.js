/*!
  Copyright (c) 2018 Xu Tongbao
  Licensed under the MIT License (MIT), see
  https://github.com/xutongbao/hello
*/
/* global define */
const fs = require('fs')

//删除path路径下的所有文件及文件夹
const removeDir = (path) => {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file) => {
      let currentPath = path + '/' + file
      if (fs.statSync(currentPath).isDirectory()) {
        removeDir(currentPath)
      } else {
        fs.unlinkSync(currentPath)    //删除文件
      }
    })
    fs.rmdirSync(path)  //删除文件夹，只能删除空文件夹
  }
}

//复制文件，如果是目录则继续调用copyDir
const copy = (src, dst) => {
  let paths = fs.readdirSync(src)
  paths.forEach((path) => {
    let _src = src + '/' + path
    let _dst = dst + '/' + path
    fs.stat(_src, (err, stats) => {
      if (err) {
        throw err
      }
      if (stats.isFile()) {
        let readable = fs.createReadStream(_src)
        let writable = fs.createWriteStream(_dst)
        readable.pipe(writable)
      } else if (stats.isDirectory()) {
        copyDir(_src, _dst, copy)
      }
    })
  })
}

//检查output输出目录是否存在，如果不存在就创建输出目录
const copyDir = (src, dst) => {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst)
      copy(src, dst)
    } else {
      copy(src, dst)
    }
  })
}

module.exports = {
  removeDir,
  copyDir
};