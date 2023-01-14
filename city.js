import axios from "axios"


const cityElem = document.querySelector(".city")
const GEO_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?"

const geoApiOtions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '49ec160365msh7d22e7e92c04b27p1dcceejsn025831e1e74c',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
}


export function setCityTitle(cityName){
	if (cityName == null) {
		cityElem.textContent = "Guangzhou"
	}
	cityElem.textContent = cityName
}

export function getCityInfo(namePrefix) {
	if (namePrefix != null) {
		return  fetch(`${GEO_URL}minPopulation=1000000&namePrefix=${namePrefix}`, geoApiOtions)
				.then(response => response.json())
				.then(res => {
					return {
						latitude: res.data[0].latitude,
						longitude: res.data[0].longitude,
						cityName: res.data[0].name,
					}
				})
				.catch(err => console.error(err));
	}
	return getCityInfo("Guangzhou")

}


const options = {
	method: 'GET',
	url: `${GEO_URL}minPopulation=1000000&namePrefix=${namePrefix}`,
	headers: {
	  'X-RapidAPI-Key': '49ec160365msh7d22e7e92c04b27p1dcceejsn025831e1e74c',
	  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
  };
  
  axios.request(options).then(function (response) {
	  console.log(response.data);
  }).catch(function (error) {
	  console.error(error);
  });