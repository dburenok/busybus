# BusyBus
Group members: Dmitriy B., Dennis F., Lisa L. and Brendon S.

## Project Progress 1
#### Project Description
This project is targeted at Vancouver bus-takers who want to have better control over their transit plans. It will allow users to see the capacity of Translink buses in real-time, and users taking a bus will be able to report the capacity of the current bus they’re on. We plan to store daily and weekly data about transit availability as well as usage data, such as our users’ most common bus stops and bus route numbers. If given enough time, we would like to implement ML-supported data analytics so that users can get notified when their usual route is more or less busy than usual as well as suggestions for alternate routes. Also, we plan to implement a point tracking system which will allow users to earn points when they report data, and consume points when they request bus information. 

#### Project task requirements
##### Minimal
* A web-based interface that shows bus stops on a map
    * Create a starter React project with a nav bar (dashboard page and about page)
    * Implement a map using a map library which works well with React (google maps/openmap/etc) and add bus stop icons using dummy location data, showing it on the dashboard page
* Automatically fetching Translink API data once every minute/30 seconds and update bus locations on the map for a selected bus stop
    * Set up the back-end to periodically fetch Translink API data and save it to a database
    * When the user clicks on a bus stop, show an info box with the upcoming buses
    * When the user clicks on one of the buses in the info box, take them to another map view where all the buses for that route will be displayed
    * Connect the front-end to the back-end and populate the map with bus stops when the page loads, and show real bus information when a bus stop is clicked
* Deploy the app (front-end and back-end) onto the web
* The ability to “tap” on a bus and see how busy it is, given that the information is available
* The ability to “tap” on a bus and submit its busyness/amount of free space
* Rudimentary login system that lets the user login (thereby automatically signing up) by simply entering their email
##### Standard
* The web-based interface is responsive and works well on small screens
* The user can use their location to find the nearest bus in order to submit busyness level (without having to look for their bus on the map)
* The user can use their location to find the nearest bus stop and see the list of upcoming buses along with their capacity (which will use up some of the user’s points)
* Point tracking system which grants points to users when they submit bus information - the points are later used to request busyness level for incoming buses
##### Stretch
* When busyness/free space information is unavailable for a bus, we estimate it based on statistical data from previous days/weeks to provide a best guess
* Email confirmation for user login

#### Sketch
![BusyBus (sketch)](https://github.com/dburenok/cpsc-455-project/assets/8009732/b6e009bd-dd90-4033-9c2b-ee1489862caf)

#### Useful links
* https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources
