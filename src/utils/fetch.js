export const fetchGeneralData = async () => {
  try {
    const response = await fetch("https://mindicador.cl/api", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (err) {
    console.error('Fetch error:', err)
    throw err
  }
}

export const fetchGetCurrency = async (currency) => {
  try {
    const response = await fetch(`https://mindicador.cl/api/${currency}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (err) {
    console.error('Fetch error:', err)
    throw err
  }
}