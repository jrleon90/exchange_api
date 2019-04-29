# Currency Exchange NodeJS API

## Table of Content

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Live Example](#live_example)
4. [API Docs](#api_docs)

## Introduction <a name="introduction"></a>

This is an API developed with NodeJS using Express as a framework, it's basically the backend of Currency Exchange Application, you can create users, Log In, create new currencies and make a currency exchange.

## Installation <a name="installation"></a>

1. Clone this repository
2. Run ```npm install```
3. Change file ```.example.env``` to ```.env```
4. Add your MongoDB URL to the ```.env``` file

## Live Example <a name="example"></a>
There is a Live example for this API deployed in Heroku. In order to use it, you have to make all the requests to the following URI:
```
https://currency-api-842.herokuapp.com
```

## API Docs <a name="api_docs"></a>

1. **Create Customer**

Send POST request to the following URI:
```
https://currency-api-842.herokuapp.com/user/register
```

Inside the POST body, it should be a JSON object with the following structure:

```
{
    first_name: ------
    last_name: ------    
    email: -----
    password: -----
}
```

2. **Log In a Customer**

In order to do this, make a POST request to:

```
https://currency-api-842.herokuapp.com/user/login
```
Sending with basic auth the user email and password, you will get a token in the response to make the next requests.

> Log In and Register are the only routes that are not protected, in order to use any of the other endpoints, it is mandatory to send a token inside the request headers.

3. **Create new currency**

In order to create a new currency send a POST request to:

```
https://currency-api-842.herokuapp.com/currency/create
```

With the request, send inside the body the changes that you want to make in JSON format.

```
{
	"currency_name": "----",
	"currency_code": "------",
	"usd_rate": -----
}
```
> Note: The usd_rate field is a Float

4. **Make an Exchange**

To create a new order, send a POST request to:

```
https://currency-api-842.herokuapp.com/exchange?from=<From_Currency>&to=<To_Currency>&total=<Total_to_exchange>
```

5. **Get cache Value**

In order to protect the client's exchange rate, when someone makes a call to the exchange endpoint, this value is store for 10 min in cache memory.

In order to get this value, send a GET request to:

```
https://currency-api-842.herokuapp.com/exchange/cache
```
> Send token with the request Header as follows: **Authorization: Bearer token**

