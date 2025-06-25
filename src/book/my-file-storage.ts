import { diskStorage } from 'multer'
import * as fs from 'fs'

// 自定义 Multer 存储配置
const storage = diskStorage({
  // destination 用于指定文件保存目录
  // 每次上传时都会尝试创建 src/files/img 目录（recursive: true 保证多级目录也能创建，不会报错）
  // 如果创建目录出错，通过回调返回错误，否则返回目标路径
  destination: function (_, __, cb) {
    try {
      fs.mkdirSync('src/files/img', { recursive: true })
    } catch (error) {
      cb(error, 'src/files/img')
    }
    cb(null, 'src/files/img')
  },
  // filename 用于自定义保存的文件名
  // 文件名由当前时间戳和一个随机数拼接，保证唯一性，防止文件名冲突
  // 保留原始文件的扩展名
  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const fileExtension = file.originalname.split('.').pop()
    cb(null, `${uniqueName}.${fileExtension}`)
  }
})

export default storage
