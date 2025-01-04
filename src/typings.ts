// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  msg: string
  data: T
}

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}

type Plan = Array<{
  text: string
  deadline: string
  doneDate: string
}>
type Task = Array<{
  title: string
  list: Plan
}>
type IPlan = {
  task: {
    [key: number]: {
      wx: Task
      wkx: Task
    }
  }
}

enum TestEnum {
  A = 'a',
  B = 'b',
}

interface LoginRes {
  openid: string
  session_key: string
}
interface Profile {
  avatar: string
  nickname: string
}
