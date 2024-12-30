import { defineStore } from 'pinia'
import { ref } from 'vue'

const appid = 'wx20deb0404aa253b8'
const secret = '8309d1ad3f70408d785bc4a03186def6'

const initState = {
  nickname: '',
  avatar: '',
  alias: { wk: '王凯', wkx: '王可馨' } as const,
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const login = (callback?: () => void) => {
      return uni.login({
        provider: 'weixin',
        success: async ({ code }) => {
          uni.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            method: 'GET',
            sslVerify: true,
            success: ({ data: _data, statusCode, header }) => {
              console.info('_data: ', (_data as any).openid)
              uni.setStorageSync('openid', (_data as any).openid ?? '-')
              callback?.()
            },
            fail: (error) => {
              console.error('error: ', error)
              uni.setStorageSync('openid', '-')
            },
          })
        },
        fail: (err) => {
          console.error('微信登录失败：', err)
        },
      })
    }

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    return {
      userInfo,
      login,
      // setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
    }
  },
  {
    persist: true,
  },
)
