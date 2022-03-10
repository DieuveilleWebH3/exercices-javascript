# Calendar App #


## React App (test) ## 


## Introduction ##
This document provides the instructions for using the Ethikdo Application developed by Dieuveille BOUSSA ELLENGA. 
This (partial) application made for Ethikdo is used to manage gift cards. 


### Definition ###

The app is based on the CRUD user interface convention.  

**Create:** you can add : new user instances (with different roles) /   new gift cards 

**Read:** you can access those user instances (see the names, usernames, emails …) / the gifts cards (title ?, slug ?, amount, ...) 

**Update:** you can edit the users, / gift cards (top up , debit) ...  

**Delete:** you can also delete users (but it is advised not to, instead turn them inactive by unchecking the active field for that user on the Django Admin panel) / gift cards 



### Target audience ###

This document is targeted (but not limited) to technical individual with a Web Development (Django) background 



## Application components ##

There are two 2 components in this project
 - The Account Module

 - The Gift cards management   




**Useful Links**

 - Homepage             localhost:3000

 - Appointment page     localhost:3000/calendrier

 - DataBase             localhost:3003/rdv

 


**Functions**

Add new appointments ( by picking the date, adding the title and an optional comment)


Consult the list of existing appointments (days with appointments appear different on the calendar by clicking any, the list of appointments for that day is displayed)

 

***Fonctionnalités : <br/>
Vous pouvez choisir une date du calendrier et prendre un rdv en cette date en remplissant son titre et son commentaire et vous cliquez sur le boutton vert prendre RDV</b>

**Commandss**

npm install


npm run api


npm start

