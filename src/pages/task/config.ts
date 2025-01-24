export const FormReflect = {
  visible: '可见模式',
  priority: '任务优先级',
  catalog: '任务分类',
  title: '任务标题',
  taskDesc: '任务描述',
  deadline: '预计完成时间',
  registerDate: '任务登记时间',
  doneDate: '任务完成时间',
  doneDesc: '任务完成描述',
} as const

export const getFormField = (
  field: keyof typeof FormReflect | (typeof FormReflect)[keyof typeof FormReflect],
) => {
  return Object.entries(FormReflect)
    .find((row) => row.includes(field))
    .filter((row) => row !== field)
    .at(0)
}

export const VisibleOptions = [
  {
    value: 'public',
    label: '公开',
  },
  // {
  //   value: 'fans',
  //   label: '粉丝可见',
  // },
  {
    value: 'onlyMe',
    label: '仅自己可见',
  },
]

export const PriorityOptions = [
  { value: 'important', label: '重点关注' },
  { value: 'common', label: '一般' },
]
