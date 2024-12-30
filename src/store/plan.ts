import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState: IPlan = {
  task: {
    2025: {
      wk: [
        {
          title: '丰富技术栈',
          list: [
            {
              text: 'Next（7月份前完成 Blog 项目，并进行性能优化，下半年接入 SSO ）',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: 'Uniapp（将年度计划迁移至微信小程序）',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: 'Nuxt（7月份前完成，尝试在工作中推行此框架）',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: 'Nest（下半年使用此框架，完成 SSO ）',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
        {
          title: '评职称',
          list: [
            {
              text: '软考：网络工程师（春节假期结束后开始学习，5月底考试，6月底出成绩）',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: '公司内部申请工程师职称（7月份提交申请）',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
        {
          title: '读书',
          list: [
            {
              text: '把之前读的书笔记做一下，写到 Blog 中（春节假期结束前完成）',
              deadline: '2025-03-01',
              doneDate: '',
            },
            {
              text: '《明朝那些事》（写一个 Blog，把明朝串起来， 2 月底前完成）',
              deadline: '2025-03-01',
              doneDate: '',
            },
            {
              text: '《夹缝生存：不堪重负的中产家庭》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《小王子》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《人类群星闪耀时》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《一生之敌》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《长安的荔枝》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《资治通鉴》（剩余部分，书太厚了，能读多少是多少）',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
        {
          title: '学习英语',
          list: [
            {
              text: '补充单词量：《10 天背完 3000 单词》',
              deadline: '2025-03-15',
              doneDate: '',
            },
            {
              text: '提升听说能力（每天 20 分钟听力，影子跟读法）',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
        {
          title: '运营',
          list: [
            {
              text: '抖音直播（选品，提升粉丝数，学习起号和运营账号）',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '小红书运营（把账号的粉丝量做起来，直到 2024 年底是 147 个粉丝）',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
      ],
      wkx: [
        {
          title: '英语学习',
          list: [
            {
              text: '背单词，会读会写',
              deadline: '2025-03-01',
              doneDate: '',
            },
            {
              text: '口语课程',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
        {
          title: '学习电脑操作',
          list: [
            {
              text: '学习使用 WPS，会制作简单的 Word、Excel、PPT',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: '学习使用在线文档',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: '学习使用 VPN 登陆 Youtube',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: '学习 VPN 的逻辑',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: '学习使用 ChatGPT',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: '学习简单的 Shell 命令',
              deadline: '2025-06-30',
              doneDate: '',
            },
            {
              text: '学习 Python，完成环境搭建，学习基本语法',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '学习使用 Python 制作 Excel',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
        {
          title: '读书',
          list: [
            {
              text: '《你当像鸟飞往你的山》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《房思琪的初恋乐园》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《活着》',
              deadline: '2025-12-31',
              doneDate: '',
            },
            {
              text: '《呼喊与细雨》',
              deadline: '2025-12-31',
              doneDate: '',
            },
          ],
        },
        {
          title: '做个人',
          list: [
            {
              text: '办理港澳通行证（寒假完成）',
              deadline: '2025-02-01',
              doneDate: '',
            },
            {
              text: '办理护照（寒假完成）',
              deadline: '2025-02-01',
              doneDate: '',
            },
          ],
        },
      ],
    },
  },
}

export const usePlanStore = defineStore(
  'plan',
  () => {
    const plan = ref<IPlan>({ ...initState })
    const curYear = Math.max(new Date().getFullYear(), 2025)

    const getCurPlan = (key?: keyof Alias) => {
      const data = plan.value.task[curYear]
      return key ? data[key] : data
    }

    return {
      curYear,
      plan,
      getCurPlan,
    }
  },
  {
    persist: true,
  },
)
