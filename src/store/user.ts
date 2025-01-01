import { defineStore } from 'pinia'
import { ref } from 'vue'
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
          const data = (await http.post('/login', { code })) as unknown as { openid: string }
          uni.setStorageSync('openid', data.openid)
          userInfo.openid = data.openid
          getProfile()
        },
        fail: (err) => {
          console.error('微信登录失败：', err)
        },
      })
    }
    const getProfile = async () => {
      const data = (await http.get('/profile', { openid: userInfo.openid })) as any
      userInfo.avatar = data.avatar
      userInfo.nickname = data.nickname
      uni.setStorageSync(
        'profile',
        JSON.stringify({ nickname: data.nickname, avatar: data.avatar }),
      )
    }
    const setProfile = async () => {
      const data = (await http.post('/profile', {
        openid: userInfo.openid,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
      })) as any
      userInfo.avatar = data.avatar
      userInfo.nickname = data.nickname
    }

    return {
      login,
      isLogined() {
        return false
      },
    }
  },
  {
    persist: true,
  },
)
