# Cycool - A cycle sharing platform
## A full stack online cycle sharing web application and API

### Features
1. A full secured user Authetication system. Users can sign in using email and can login back to profile and dashboard.
2. Can Add their cycle for other to use. Can upload picture of cycle (that will store on cloudinary), Pickup location and other details with time period in which cycle is available.
3. Users can book that cycle with suitable pickup point and time.
4. Can cahrge upto INR 30 per hour for using cycle. 





### Tech Stack Used : 
1. NodeJS, Express for Backend (for managing DataBase and Server)
2. HTML and EJS for View Template (for rendering server date to client)
3. jQuery for client side Scripting (for animation and client functions)
4. MySQL for DataBases (to storing user and cycle details)
5. Cloudinary for storing Media (images) on cloud
6. Other services : Multer (File uploaded to server), bcryptjs (Password hasher)
 
 
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

#### ScreenShots :

![HomePage Screenshot](https://github.com/rohitsaini1196/cycle-sharing/blob/master/screenshots/s4.png)


![User Registration and login Screenshot](https://github.com/rohitsaini1196/cycle-sharing/blob/master/screenshots/s2.png)

![Profile and Dashboard Screenshot](https://github.com/rohitsaini1196/cycle-sharing/blob/master/screenshots/s3.png)

> Please Contact me if you have any issue. Email-id : sidsaini1196@gmail.com
