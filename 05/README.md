# Social Network App #


## Vue JS App (test) ## 


## Introduction ##
This document provides the instructions for using the Vue JS Social Network Application developed by Dieuveille BOUSSA ELLENGA. 
This (partial) application is a small facebook type of clone. 




### Definition ###

The app is based on the CRUD user interface convention.  

**Create:** you can add new posts / create an account   

**Read:** you can access those posts instances (see the title, date, comment, …) 

**Update:** you can edit the posts, ...  *not implemented yet (time  constraint)*

**Delete:** you can also delete posts  *not implemented yet (time  constraint)*



### Target audience ###

This document is targeted (but not limited) to technical individual with a Web Development (JavaScript / Vue JS) background 




## Application components ##

There are two 2 components (modules / general scopes of project) in this project

 - The Authentication Module  

 - The Posts Management Module   




**Useful Links**

 - Homepage                localhost:3000

 - Authentication page     localhost:3000/connexion

 - DataBase                
  - - localhost:3003/utilisateurs            
  - - localhost:3003/articles





**Functions**


Create an account 

Edit your account         *not implemented yet (time  constraint)*

Add new posts.

Add comments

Like posts

Edit posts                *not implemented yet (time  constraint)*

Delete posts              *not implemented yet (time  constraint)*
 



**Commands**


>> Clone repo   Open directory     then Run

- npm install


- npm run serve 


- npm run dev 




**Account present in db**


>> Open browser   

- Email : dieuveilleellenga@mail.com 
- Password : 123User 


- Email : jojoystar.2@mail.com 
- Password : 123User 




## Bonuses ? ##

 - Security check : user cannot create empty post, **content is  mandatory** 
  - - *used if statement to ensure that*

 - Security check : user cannot create empty comment, **content is  mandatory** 
  - - *used if statement to ensure that*


>>
 - Responsive interface 



