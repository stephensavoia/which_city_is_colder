// Data is from simplemaps.com
let cities = [
    {"city" : "Tokyo", "lat" : 35.6897, "long" : 139.6922},
    {"city" : "Jakarta", "lat" : -6.175, "long" : 106.8275},
    {"city" : "Delhi", "lat" : 28.61, "long" : 77.23},
    {"city" : "Guangzhou", "lat" : 23.13, "long" : 113.26},
    {"city" : "Mumbai", "lat" : 19.0761, "long" : 72.8775},
    {"city" : "Manila", "lat" : 14.5958, "long" : 120.9772},
    {"city" : "Shanghai", "lat" : 31.2286, "long" : 121.4747},
    {"city" : "Sao Paulo", "lat" : -23.55, "long" : -46.6333},
    {"city" : "Seoul", "lat" : 37.56, "long" : 126.99},
    {"city" : "Mexico City", "lat" : 19.4333, "long" : -99.1333},
    {"city" : "Cairo", "lat" : 30.0444, "long" : 31.2358},
    {"city" : "New York", "lat" : 40.6943, "long" : -73.9249},
    {"city" : "Dhaka", "lat" : 23.7639, "long" : 90.3889},
    {"city" : "Beijing", "lat" : 39.9067, "long" : 116.3975},
    {"city" : "Kolkata", "lat" : 22.5675, "long" : 88.37},
    {"city" : "Bangkok", "lat" : 13.7525, "long" : 100.4942},
    {"city" : "Shenzhen", "lat" : 22.5415, "long" : 114.0596},
    {"city" : "Moscow", "lat" : 55.7558, "long" : 37.6172},
    {"city" : "Buenos Aires", "lat" : -34.6033, "long" : -58.3817},
    {"city" : "Lagos", "lat" : 6.455, "long" : 3.3841},
    {"city" : "Istanbul", "lat" : 41.0136, "long" : 28.955},
    {"city" : "Karachi", "lat" : 24.86, "long" : 67.01},
    {"city" : "Bangalore", "lat" : 12.9789, "long" : 77.5917},
    {"city" : "Ho Chi Minh City", "lat" : 10.7756, "long" : 106.7019},
    {"city" : "Osaka", "lat" : 34.6939, "long" : 135.5022},
    {"city" : "Tehran", "lat" : 35.6892, "long" : 51.3889},
    {"city" : "Kinshasa", "lat" : -4.3219, "long" : 15.3119},
    {"city" : "Rio de Janeiro", "lat" : -22.9111, "long" : -43.2056},
    {"city" : "Chennai", "lat" : 13.0825, "long" : 80.275},
    {"city" : "Lahore", "lat" : 31.5497, "long" : 74.3436},
    {"city" : "Los Angeles", "lat" : 34.1141, "long" : -118.4068},
    {"city" : "London", "lat" : 51.5072, "long" : -0.1275},
    {"city" : "Paris", "lat" : 48.8567, "long" : 2.3522},
    {"city" : "Hyderabad", "lat" : 17.3617, "long" : 78.4747},
    {"city" : "Lima", "lat" : -12.06, "long" : -77.0375},
    {"city" : "Nagoya", "lat" : 35.1833, "long" : 136.9},
    {"city" : "Luanda", "lat" : -8.8383, "long" : 13.2344},
    {"city" : "Kuala Lumpur", "lat" : 3.1478, "long" : 101.6953},
    {"city" : "Johannesburg", "lat" : -26.2044, "long" : 28.0456},
    {"city" : "Chicago", "lat" : 41.8375, "long" : -87.6866},
    {"city" : "Hanoi", "lat" : 21, "long" : 105.85},
    {"city" : "Pune", "lat" : 18.5203, "long" : 73.8567},
    {"city" : "Ahmedabad", "lat" : 23.0225, "long" : 72.5714},
    {"city" : "Bogota", "lat" : 4.7111, "long" : -74.0722},
    {"city" : "Dar es Salaam", "lat" : -6.8161, "long" : 39.2803},
    {"city" : "Khartoum", "lat" : 15.6, "long" : 32.5},
    {"city" : "Hong Kong", "lat" : 22.3, "long" : 114.2},
    {"city" : "Riyadh", "lat" : 24.6333, "long" : 46.7167},
    {"city" : "Santiago", "lat" : -33.4372, "long" : -70.6506},
    {"city" : "Chattogram", "lat" : 22.335, "long" : 91.8325},
    {"city" : "Surabaya", "lat" : -7.2458, "long" : 112.7378},
    {"city" : "Surat", "lat" : 21.1702, "long" : 72.8311},
    {"city" : "Madrid", "lat" : 40.4169, "long" : -3.7033},
    {"city" : "Baghdad", "lat" : 33.3153, "long" : 44.3661},
    {"city" : "Miami", "lat" : 25.784, "long" : -80.2101},
    {"city" : "Singapore", "lat" : 1.3, "long" : 103.8},
    {"city" : "Houston", "lat" : 29.786, "long" : -95.3885},
    {"city" : "Dallas", "lat" : 32.7935, "long" : -96.7667},
    {"city" : "Douala", "lat" : 4.05, "long" : 9.7},
    {"city" : "Philadelphia", "lat" : 40.0077, "long" : -75.1339},
    {"city" : "Toronto", "lat" : 43.7417, "long" : -79.3733},
    {"city" : "Giza", "lat" : 29.987, "long" : 31.2118},
    {"city" : "Nairobi", "lat" : -1.2864, "long" : 36.8172},
    {"city" : "Guadalajara", "lat" : 20.6767, "long" : -103.3475},
    {"city" : "Ankara", "lat" : 39.93, "long" : 32.85},
    {"city" : "Saint Petersburg", "lat" : 59.9375, "long" : 30.3086},
    {"city" : "Monterrey", "lat" : 25.6667, "long" : -100.3},
    {"city" : "Belo Horizonte", "lat" : -19.9167, "long" : -43.9333},
    {"city" : "Rangoon", "lat" : 16.795, "long" : 96.16},
    {"city" : "Atlanta", "lat" : 33.7628, "long" : -84.422},
    {"city" : "Washington", "lat" : 38.9047, "long" : -77.0163},
    {"city" : "Melbourne", "lat" : -37.8142, "long" : 144.9631},
    {"city" : "Abidjan", "lat" : 5.3167, "long" : -4.0333},
    {"city" : "Berlin", "lat" : 52.52, "long" : 13.405},
    {"city" : "Alexandria", "lat" : 31.1975, "long" : 29.8925},
    {"city" : "Sydney", "lat" : -33.8678, "long" : 151.21},
    {"city" : "Barcelona", "lat" : 41.3828, "long" : 2.1769},
    {"city" : "Cape Town", "lat" : -33.9253, "long" : 18.4239},
    {"city" : "Jeddah", "lat" : 21.5433, "long" : 39.1728},
    {"city" : "Boston", "lat" : 42.3188, "long" : -71.0852},
    {"city" : "Izmir", "lat" : 38.42, "long" : 27.14},
    {"city" : "Kabul", "lat" : 34.5253, "long" : 69.1783},
    {"city" : "Bamako", "lat" : 12.6392, "long" : -8.0028},
    {"city" : "Fortaleza", "lat" : -3.7275, "long" : -38.5275},
    {"city" : "Phoenix", "lat" : 33.5722, "long" : -112.0892},
    {"city" : "Amman", "lat" : 31.9497, "long" : 35.9328},
    {"city" : "Abuja", "lat" : 9.0667, "long" : 7.4833},
    {"city" : "Yokohama", "lat" : 35.4442, "long" : 139.6381},
    {"city" : "Detroit", "lat" : 42.3834, "long" : -83.1024},
    {"city" : "Montreal", "lat" : 45.5089, "long" : -73.5617},
    {"city" : "Medan", "lat" : 3.5894, "long" : 98.6739},
    {"city" : "Seattle", "lat" : 47.6211, "long" : -122.3244},
    {"city" : "Ibadan", "lat" : 7.3964, "long" : 3.9167},
    {"city" : "Casablanca", "lat" : 33.5333, "long" : -7.5833},
    {"city" : "Kumasi", "lat" : 6.7, "long" : -1.625},
    {"city" : "Busan", "lat" : 35.18, "long" : 129.075},
    {"city" : "Algiers", "lat" : 36.7539, "long" : 3.0589},
    {"city" : "Lucknow", "lat" : 26.85, "long" : 80.95},
    {"city" : "Mashhad", "lat" : 36.3264, "long" : 59.5433},
    {"city" : "San Francisco", "lat" : 37.7558, "long" : -122.4449}
  ];

export function getTwoRandomCities() {
    let randomNumber1 = Math.floor(Math.random() * cities.length);
    let randomNumber2 = Math.floor(Math.random() * cities.length);
    while (randomNumber1 === randomNumber2) {
        randomNumber2 = Math.floor(Math.random() * cities.length);
    }
    return [cities[randomNumber1], cities[randomNumber2]];
}