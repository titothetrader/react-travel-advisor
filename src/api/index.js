import axios from "axios"

export const getPlacesData = async (type, bounds) => {
    const options = {
        params: {
          bl_latitude: bounds.sw.lat,
          tr_latitude: bounds.ne.lat,
          bl_longitude: bounds.sw.lng,
          tr_longitude: bounds.ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };

    try {
        const {data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, options)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
      'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
  }
  try {
    const { data } = await axios.get(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}`, options)
    return data
  } catch (error) {
    console.log(error)
  }
}