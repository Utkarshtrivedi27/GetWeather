import React, {useState} from 'react';
import { Button,Input,Card,CardContent,Box} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; 
import SearchIcon from '@mui/icons-material/Search';
import './styles.css';


const Weather = ()=>{
    const [location,setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const searchCity = async(e)=>{
        e.preventDefault();

        if (location) {
            setLoading(true);
            setError(null);
      
            try {
                const res = await fetch(`http://localhost:5000/city/${location}`);
                
                if (res.status == 404) {
                    throw new Error('City not found');
                }

                if (res.status == 500){
                    throw new Error('Server Error')
                }
      
                const data = await res.json();
              
                setWeatherData({
                    temperature: data["temperature"],
                    feelsLike: data["feels_like"],
                    humidity: data["humidity"],
                    dewPoint: data["dew_point"],
                    windSpeed: data["wind_speed"],
                    visibility: data["visibility"],
                    cloudCover: data["cloud_cover"],
                    name: data["name"]
                });

            }
            catch(e){
                e.message = 'Internal Server Error';
                setError(e);
            }
            finally{
                setLoading(false)
            }
        }
    }

    return (
        <div className='main_box'>
            <form onSubmit={searchCity} className='form'>
                
                <Input 
                    sx={{color:'whitesmoke'}}
                    placeholder="Search city ..."  
                    type='text' 
                    color='primary'
                    value={location}
                    onChange={(e)=> setLocation(e.target.value)}
                />

                <Button className='btn' variant="contained" color='primary' type='submit'>
                    Search
                </Button>
                
                
            </form>

            <div className='misc'>
                {loading && <div>
                        Loading...
                    </div>}

                {error && <div>
                        Error<b>:</b> &nbsp;{error.message}
                    </div>
                }
            </div>


            {!error && weatherData && (
                <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Card className='card' sx={{backgroundColor:'#265df3d0'}}>
                            <CardContent className='card_content'>
                                <p>Temperature: {weatherData.temperature} °C</p>
                            </CardContent>
                        </Card>


                        <Card className='card' sx={{backgroundColor:'#265df3d0'}}>
                            <CardContent className='card_content'>
                                <p>Feels Like: {weatherData.feelsLike} °C</p>
                            </CardContent>
                        </Card>


                        <Card className='card' sx={{backgroundColor:'#265df3d0'}}>
                            <CardContent className='card_content'>
                                <p>Humidity: {weatherData.humidity} %</p>
                            </CardContent>
                        </Card>

                    
                        <Card className='card' sx={{backgroundColor:'#265df3d0'}}>
                            <CardContent className='card_content'>
                                <p>Dew Point: {weatherData.dewPoint} °C</p>
                            </CardContent>
                        </Card>
                
                        <Card className='card' sx={{backgroundColor:'#265df3d0'}}>
                            <CardContent className='card_content'>
                                <p>Wind Speed: {weatherData.windSpeed} km/h</p>
                            </CardContent>
                        </Card>


                        <Card className='card' sx={{backgroundColor:'#265df3d0'}}>
                            <CardContent className='card_content'>
                                <p>Visibility: {weatherData.visibility} km</p>
                            </CardContent>
                        </Card>


                        <Card className='card' sx={{backgroundColor:'#265df3d0'}}>
                            <CardContent className='card_content'>
                                <p>Cloud Cover: {weatherData.cloudCover} %</p>
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>


                <div className='loc_name'>
                    <h4>{weatherData.name}</h4>
                </div>
                </>
                )
            }

        </div>
    );
}


export default Weather;
