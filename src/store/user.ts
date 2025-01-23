import { defineStore } from 'pinia'
import { http } from '@/utils/http'

const initState = {
  openid: null,
  nickname: '',
  avatar: '',
  homeUrl: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = reactive<IUserInfo>({ ...initState })
    const openid = computed(async () => userInfo.openid ?? uni.getStorageSync('openid'))

    const login = async () => {
      const openid = await uni.getStorageSync('openid')
      if (openid) {
        userInfo.openid = openid
        return
      }
      return new Promise((resolve, reject) => {
        return uni.login({
          provider: 'weixin',
          success: async ({ code }) => {
            const { data } = await http.post<LoginRes>('/login', { code })
            uni.setStorageSync('openid', data.openid)
            userInfo.openid = data.openid
            await getProfile()
            resolve(null)
          },
          fail: (err) => {
            console.error('微信登录失败：', err)
            reject(err)
          },
        })
      })
    }
    const getProfile = async (): Promise<IUserInfo> => {
      const { data } = await http.get<Profile>('/profile')
      if (data === null) {
        return Promise.resolve(null)
      }
      userInfo.avatar = data.avatar
      userInfo.nickname = data.nickname
      userInfo.homeUrl = data.homeUrl
      return userInfo
    }
    const setProfile = async (info: Profile) => {
      const { data } = await http.post<Profile>('/profile', info)
      userInfo.avatar = data.avatar
      userInfo.nickname = data.nickname
      userInfo.homeUrl = data.homeUrl
    }

    return {
      openid,
      userInfo,
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
