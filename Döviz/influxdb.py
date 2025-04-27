from influxdb_client import InfluxDBClient, Point,WritePrecision
from datetime import datetime
import requests

API_KEY = "63cc8fb0c37a3c006bf3eb5c"
INFLUXDB_URL = "http://localhost:8086"
INFLUXDB_TOKEN = "3LtuNGSVl8XuGrmHEyAvC9bZIDDWkYE79SyUj5T4gRuc40NLmLFd8oqL0ZHAR_j-WmmVOAVFWSMyIP3Du9jgmA=="
INFLUXDB_ORG = "Deneme"
INFLUXDB_BUCKET = "doviz"

BASE_URL = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD"

def doviz_kuru_al():
    
    repsonse = requests.get(BASE_URL)
    if repsonse.status_code != 200:
        raise Exception("API isteği başarısız oldu.")
    
    data = repsonse.json()
    return data["conversion_rates"]

def influxdb(rates):
    client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
    write_api = client.write_api(write_options=WritePrecision.NS)
    
    point = Point("doviz_kuru")\
        .tag("base", "USD")\
        .field("EUR", rates['EUR']) \
        .field("GBP", rates['GBP']) \
        .field("JPY", rates['JPY']) \
        .field("TRY", rates['TRY']) \
        .time(datetime.utcnow(), WritePrecision.NS)
        
    write_api.write(bucket=INFLUXDB_BUCKET,org=INFLUXDB_ORG, record=point)
    print("Veri InfluxDB'ye yazıldı.")
    
if __name__ == "__main__":
    doviz = doviz_kuru_al()
    influxdb(doviz)

