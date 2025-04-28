from influxdb_client import InfluxDBClient, Point,WritePrecision
from datetime import datetime,timezone
import requests
import time

API_KEY = "63cc8fb0c37a3c006bf3eb5c"
INFLUXDB_URL = "http://localhost:8086"
INFLUXDB_TOKEN = "3LtuNGSVl8XuGrmHEyAvC9bZIDDWkYE79SyUj5T4gRuc40NLmLFd8oqL0ZHAR_j-WmmVOAVFWSMyIP3Du9jgmA=="
INFLUXDB_ORG = "Deneme"
INFLUXDB_BUCKET = "Deneme"

BASE_URL = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD"

DOVIZ_LISTESI = ["USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "RUB", "SAR", "NOK", "SEK", "DKK", "AED"]

def doviz_kuru_al():
    
    response = requests.get(BASE_URL)
    if response.status_code != 200:
        raise Exception("API isteği başarısız oldu.")
    
    data = response.json()
    return data["conversion_rates"]

def influxdbye_yaz(rates):
    
    client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
    write_api = client.write_api()
    
    usd_to_try = rates['TRY']  
    
    point = Point("doviz_kuru")\
        .tag("base", "TRY")\
        .time(datetime.now(timezone.utc), WritePrecision.NS)

    point = point.field("TRY", 1.0)

    for doviz in DOVIZ_LISTESI:
        if doviz in rates:
            value = usd_to_try / rates[doviz]
            point = point.field(doviz, round(value, 4))  
    
    write_api.write(bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, record=point)
    print("Veri yazıldı:", datetime.now())
    
if __name__ == "__main__":
    while True:
        try:
            doviz = doviz_kuru_al()
            print(doviz)
            influxdbye_yaz(doviz)
        except Exception as e:
            print("Hata:", e)
        
        time.sleep(9)
    

