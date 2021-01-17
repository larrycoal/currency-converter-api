# currency-converter-api
This is a currency converter api.

# How It Works
1 Send a GET request to /api/rates
2 your resuest should provide two params. Base currency and Currency to be converted to.
3 Example of valid params /api/rates/?base="czk"&currency="usd",eur",.....etc
4 Ensure your currency are separated by comma

# API test

https://enye-currency-converter-larry.herokuapp.com/api/rates?base=CZK&currency=EUR,GBP,USD