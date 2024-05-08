# reference: https://www.kaggle.com/datasets/swaroopmeher/boston-weather-2013-2023

from datetime import datetime
from meteostat import Stations, Daily
import pandas as pd

# Set time period
start = datetime(2023, 3, 1)
end = datetime(2024, 3, 1)

# Get daily data
data = Daily('72509', start, end)
data = data.fetch()
data=data.reset_index().iloc[:,[0,1,2,3,4,6,7,9]]

data.to_csv('boston_weather_data.csv',index=False)