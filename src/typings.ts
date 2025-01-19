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

enum TestEnum {
  A = 'a',
  B = 'b',
}

interface LoginRes {
  openid: string
  session_key: string
}

interface TaskRes {
  id: number
  done: boolean
  catalog: string
  deadline: string
  doneAttachMent: string
  doneDesc: string
  lastUpdateDate: string
  openid: string
  registerDate: string
  taskDesc: string
  title: string
  visible: 'public' | 'onlyMe'
}
interface Plan {
  catalog: TaskRes['catalog']
  list: Array<TaskRes>
}

interface Profile {
  avatar: string
  nickname: string
}

interface TaskQuery {
  id?: string
  status?: 'toComplete'
}
