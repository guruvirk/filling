# Filling App

## Creating User

```JavaScript 
{
    "phone": "7792902639",
    "password": "1234",
    "code": "test2",
}
```

## Creating Owner type User

```JavaScript 
{
    "phone": "7792902639",
    "password": "1234",
    "code": "test2",
    "type": "owner"
}
```

## Creating Employee type User

```JavaScript 
{
    "phone": "7792902639",
    "password": "1234",
    "code": "test2",
    "type": "owner",
    "station": "{{station.id}}"
}
```

## Update User

```JavaScript 
{
    "status": "inactive", // active, inactive or blocked
    "station": "{{station.id}}",
    "picUrl": "http:/localhost:8080/api/download/1594109330792-sampleimage.png"
}
```

## Login

```JavaScript 
{
    "phone": "7792902639",
    "password": "1234"
}
```

### Create Station

```JavaScript 
{
	"name":"test1",
    "services": [
        "gas"
    ],
    "lat": "29.5201",
    "long": "76.6142"
}
```

### Search Stations

Params

```JavaScript 
{
    "lat"=29.5201,
    "long"=76.2142,
    "around"=50000 //radius
}
```

### Create Booking

```JavaScript 
{
    "station":"{{station.id}}",
    "items": [{
        "vehicle":"car",
        "service": "gas"
    },{
        "vehicle":"van",
        "service": "gas"
    }]
}
```

### Search Bookings

Will search according to user type

Params Available

```JavaScript 
{
    "status":"new" //done or inProgress
}
```


### Update Booking

```JavaScript 
{
    "status":"done", //done or inProgress
    "total": 50
}
```
