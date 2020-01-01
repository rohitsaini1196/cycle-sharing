# Cycool - A cycle sharing platform
## A full stack online cycle sharing web application and API

### Features
1. A full secured user Authetication system. Users can sign in using email and can login back to profile and dashboard.
2. Can Add cycle for other to use with time-wise price. Can upload picture of cycle (that will store on online cloudinary) and other details with time period in which cycle is available 
3. Users can book that cycle with suitable pickup point and time.





### Tech Stack Used : 
1. NodeJS, Express for Backend
2. HTML and EJS for View Template
3. jQuery for client side Scripting 
4. MySQL for DataBases
5. Cloudinary for storing Media (images) on cloud
 
 
 #### How to test it : 
 download zip or git clone this repo 
 ```console
cd cycle-sharing
npm install 
```
##### Change /config/db.js credentials to your database credentials
##### Change /routes/addCycle.js [Cloudinary](https://cloudinary.com/console) api and secret key to your api key
#### now run

 ```console
npm start
```

###### And go to http://localhost:3000


