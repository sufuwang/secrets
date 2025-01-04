import { defineStore } from 'pinia'
import { http } from '@/utils/http'

const initState = {
  openid: '',
  nickname: '',
  avatar: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = reactive<IUserInfo>({ ...initState })

    const login = () => {
      return uni.login({
        provider: 'weixin',
        success: async ({ code }) => {
          const { data } = await http.post<LoginRes>('/login', { code })
          uni.setStorageSync('openid', data.openid)
          userInfo.openid = data.openid
          getProfile()
        },
        fail: (err) => {
          console.error('微信登录失败：', err)
        },
      })
    }
    const getProfile = async (): Promise<IUserInfo> => {
      const { data } = await http.get<Profile>('/profile', { openid: userInfo.openid })
      if (data === null) {
        return Promise.resolve(null)
      }
      userInfo.avatar = data.avatar
      userInfo.nickname = data.nickname
      return userInfo
    }
    const setProfile = async (info: Profile) => {
      const { data } = await http.post<Profile>('/profile', {
        openid: userInfo.openid,
        nickname: info.nickname,
        avatar: info.avatar,
      })
      userInfo.avatar = data.avatar
      userInfo.nickname = data.nickname
    }

    return {
      login,
      getProfile,
      setProfile,
      isLogined() {
        return false
      },
    }
  },
  {
    persist: true,
  },
)
