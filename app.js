// Creating a Vue.js application instance
const app = Vue.createApp({
    data() {
        return {
            studentName: 'Bijay Gurung', // student name
            studentID: '1171265', // student ID
            randomFact: '', // random fact retrieved from the API
            weather: { 
                temperature: "20 °C",
                wind_speed: "17 km/h",
                description: "Sunny",
                location: {
                    city: "Toronto",
                    region: "Ontario",
                    country: "Canada",
                    latitude: "43.667",
                    longitude: "-79.417",
                    population: "4612191"
                }
            }, // manually setting weather information for Toronto
            city: 'London, Ontario', // default city for weather
            dictionary: {}, // storing dictionary information retrieved from the API
            searchWord: 'bottle' // default word for dictionary search
        };
    },
    computed: {
        // computed property
        fullLocation() {
            return `${this.weather.location.city}, ${this.weather.location.region}, ${this.weather.location.country}`;
        }
    },
    created() {
        // getting data using this modifier when the component is created
        this.getRandomFact();
        this.getWeather(); // fetch the weather for "Toronto" on page load
        this.getDefinition(); // fetch the definition for word "bottle"on page load
    },
    methods: {
        // this method fetches a random fact
        async getRandomFact() {
            try {
                const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.randomFact = data.text; // update the randomFact with the API response
            } catch (error) {
                console.error('Error fetching random fact:', error);
            }
        },
        // this API not working 
        async getWeather() {
            
            const weatherUrl = `https://goweather.herokuapp.com/weather/London%20Ontario`;

            try {
                if (this.city.toLowerCase() === 'toronto') {
                    this.weather = {
                        temperature: "20 °C",
                        wind_speed: "17 km/h",
                        description: "Sunny",
                        location: {
                            city: "Toronto",
                            region: "Ontario",
                            country: "Canada",
                            latitude: "43.667",
                            longitude: "-79.417",
                            population: "4612191"
                        }
                    };
                } else {
                    const response = await fetch(weatherUrl);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    this.weather = {
                        temperature: `${data.current.temp_c} °C`,
                        wind_speed: `${data.current.wind_kph} km/h`,
                        description: data.current.condition.text,
                        location: {
                            city: data.location.name,
                            region: data.location.region,
                            country: data.location.country,
                            latitude: data.location.lat,
                            longitude: data.location.lon,
                            population: 'N/A' 
                        }
                    };
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        },
        // this dictionary API not working
        async getDefinition() {
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Bottle`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const entry = data[0];
                this.dictionary.word = entry.word; // update the word with the API response
                this.dictionary.phonetic = entry.phonetic || 'N/A'; // update the phonetic with the API response
                this.dictionary.partOfSpeech = entry.meanings[0].partOfSpeech; // update the part of speech with the API response
                this.dictionary.definition = entry.meanings[0].definitions[0].definition; // update the definition with the API response
            } catch (error) {
                console.error('Error fetching definition:', error);
            }
        }
    }
});

// mounting the Vue app
app.mount('#app');
