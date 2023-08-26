export const formatDate = (date: string | Date) => {
  const d = new Date(date)
  const formatedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

  return formatedDate
}
