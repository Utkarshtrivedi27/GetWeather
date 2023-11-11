from flask import Flask
from flask_cors import CORS
import requests

app = Flask("My api")
CORS(app)

API_KEY = "xJqHflUkDZbZskCjqPSid4AZfs91y1m9"
API_KEY2 = "9d95c564881b357571cd38255370b54c"

@app.route('/')
def greet():
    return {"message": "Welcome to our Home Page"},200


@app.route("/city/<city_name>")
def get_by_city(city_name):
    # print("Your city:",city_name)

    res = requests.get(f"https://api.tomorrow.io/v4/weather/realtime?location={city_name}&apikey={API_KEY}")
    res2 = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY2}")
    # print("res=", res)

    res_code = int("".join(x for x in str(res) if x.isdigit()))
    # print("res_code=", res_code)

    if res_code == 200:
        res = res.json()

        temperature = res["data"]["values"]["temperature"]
        feels_like = res["data"]["values"]["temperatureApparent"]
        humidity = res["data"]["values"]["humidity"]
        dew_point = res["data"]["values"]["dewPoint"]
        wind_gust = round(res["data"]["values"]["windGust"]*(18/5), 2)
        wind_speed = round(res["data"]["values"]["windSpeed"]*(18/5), 2)
        visibility = round(res["data"]["values"]["visibility"], 3)
        cloud_cover = res["data"]["values"]["cloudCover"]
        name = res["location"]["name"]

        return {"temperature": temperature,
                "feels_like": feels_like,
                "humidity": humidity,
                "dew_point": dew_point,
                "wind_gust": wind_gust,
                "wind_speed": wind_speed,
                "visibility": visibility,
                "cloud_cover": cloud_cover,
                "name": name}, 200

    elif res_code == 404:
        return {"message": "Something went wrong!"}, 404

    else:
        return {"message": "Server error!"}, 500
