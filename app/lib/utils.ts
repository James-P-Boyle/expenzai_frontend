export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const getWeekRange = (weekStart: string) => {
  const start = new Date(weekStart)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)

  return `${formatDate(weekStart)} - ${formatDate(
    end.toISOString().split("T")[0]
  )}`
}
