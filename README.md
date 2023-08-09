# BusyBus

Group members: Dmitriy B., Dennis F., Lisa L. and Brendon S.

Have you... Ever stood at a bus stop wondering where the bus was? Ever had a bus pass by with the words "SORRY, BUS FULL"? This application is for you! See where your bus is and help others anticipate how full future buses are. With a slick mobile UI, this is the modern approach to transit, short of asking ChatGPT.

#### Project Description

This project is targeted at Vancouver bus-takers who want to have better control over their transit plans. It will allow users to see the capacity of Translink buses in real-time, and users taking a bus will be able to report the capacity of the current bus they’re on. We plan to store daily and weekly data about transit availability as well as usage data, such as our users’ most common bus stops and bus route numbers. If given enough time, we would like to implement ML-supported data analytics so that users can get notified when their usual route is more or less busy than usual as well as suggestions for alternate routes. Also, we plan to implement a point tracking system which will allow users to earn points when they report data, and consume points when they request bus information.

#### Project task requirements

##### Minimal

- :white_check_mark:A web-based interface that shows bus stops on a map
  - Create a starter React project with a nav bar (dashboard page and about page)
  - Implement a map using a map library which works well with React (google maps/openmap/etc) and add bus stop icons using dummy location data, showing it on the dashboard page
- :white_check_mark:Automatically fetching Translink API data once every minute/30 seconds and update bus locations on the map for a selected bus stop
  - Set up the back-end to periodically fetch Translink API data and save it to a database
  - When the user clicks on a bus stop, show an info box with the upcoming buses
  - When the user clicks on one of the buses in the info box, take them to another map view where all the buses for that route will be displayed
  - Connect the front-end to the back-end and populate the map with bus stops when the page loads, and show real bus information when a bus stop is clicked
- :white_check_mark:Deploy the app (front-end and back-end) onto the web
- :white_check_mark:The ability to “tap” on a bus and see how busy it is, given that the information is available
- :white_check_mark:The ability to “tap” on a bus and submit its busyness/amount of free space

##### Standard

- :white_check_mark:The web-based interface is responsive and works well on small screens
- :white_check_mark:The user can use their location to find the nearest bus in order to submit busyness level (without having to look for their bus on the map)
- :white_check_mark:The user can use their location to find the nearest bus stop and see the list of upcoming buses along with their capacity (which will use up some of the user’s points)


##### Stretch

- :x:When busyness/free space information is unavailable for a bus, we estimate it based on statistical data from previous days/weeks to provide a best guess
- :x:Email confirmation for user login

#### How Tech from Unit 1-5 are used
- Our website is built based on HTML and custimzed CSS stylesheets.
- Our frontend applied React library and are divided and managed as components. We also used hooks like useState, useEffect to manage our state. Redux is also used to put the whole state into one central store and make it more clean and organized.
- A responsive NodeJS server is created to support our frontend. Different types of APIs are provided to create/update/get the data user requested.
- Daily and weekly data about transit availability as well as usage data are stored in a MongoDB database. Queries are written based on the need of API to access and modify the data in our database.
- Both our frontend and backend are deployed on Render and can be accessed from different devices. The database is hosted on Atlas.

#### Above and Beyond
- map-gl library is integrated into our project and provides accurate location of buses and bus stops
- closest bus stops are provided based on user's location
- scripts are running on a regular basis in the backend to scrap up-to-date information via Translink API
- aggregation queries are used to remove outdated information from our database
- our app is compatible with small screens
- A few user-friendly UX design like bus/stop switching, and the highlighting of selected stop/bus

  
#### Next Steps
- login system and points tracking system to encourage user data input
- statistical analysis based on user data and recommendation system


#### Contribution List
##### Lisa Li: 
- adaption of frontend template and UX design
- capacity report popup and API
- bus/stop switch
- aggregation queries for removing outdated capacity report
- closest bus marker
##### Dennis Fan:
- back-end API access to DB
- back-end DB adaptation to enable geospatial search
- front-end design for geolocation based stop selection
##### Dmitriy Burenok:
- implement mapbox-gl map library
- create Translink API bus stop scraper
- integrate client and server to show bus stops for a given route
- fix mobile search bar
- highlight selected bus and bus stop

#### Sketch

![BusyBus (sketch)](https://github.com/dburenok/cpsc-455-project/assets/8009732/b6e009bd-dd90-4033-9c2b-ee1489862caf)

#### Useful links

- https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources
