export const formatDate = (unformattedDate) => {

  const date = new Date(unformattedDate)

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`

  return formattedDate
}

export const formatArrayDateAndReverse = (array) => {
  const newArray = array
    .map((entry) => ({
      ...entry,
      fecha: formatDate(entry.fecha),
    }))
    .reverse()

  return newArray
}

export const calculateAveragePerYear = (data) => {
  const yearlyData = {}

  const usedColors = new Set()

  data.forEach(entry => {
    const year = entry.fecha.slice(0, 4)

    if (!yearlyData[year]) {
      yearlyData[year] = []
    }

    yearlyData[year].push(entry.valor)
  })

  const yearlyAverage = Object.keys(yearlyData).map(year => {
    const values = yearlyData[year]
    const average = values.reduce((acc, curr) => acc + curr, 0) / values.length

    const color = getUniqueColor(usedColors)
    if (color) {
      usedColors.add(color)
    }

    return {
      fecha: parseInt(year),
      media: parseFloat(average.toFixed(2)),
      fill: color || '#757575'
    }
  })

  return yearlyAverage
}

const getUniqueColor = (usedColors) => {
  const predefinedColors = [
    '#5059D9',
    '#D95067',
    '#50A2D9',
    '#92D950',
    '#50D9B0',
    '#E0C529'
  ]


  for (const color of predefinedColors) {
    if (!usedColors.has(color)) {
      return color
    }
  }
  return null
}
