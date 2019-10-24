# Online-Gift   
  
## description  
 this is a **back-end** that help you send a gift to some one far away you, 
 as the website have some gifts and you as user could create order.
 your oder should contan the following:     
 **gift/s you chosed, some information about who will reacive the order, location, and Date**     
 after that our job to deliver the gift 
 
 ## How to use 
 please open  https://online-gift-task.herokuapp.com/api   
 you will get all avalible links to end points and how to use it.   
 you should see some thing like this 
 
        {
            msg: "this URL not found you can use",
            availableUrls: [
                "auth/login           POST",
                "auth/signup          POST",
                "api/gifts            GET {POST DELETE, auth: true, admin: true}",
                "api/gifts/:id        GET {PUT DELETE,  auth: true, admin: true }",
                "api/gifts/:id/upload {POST,  auth: true, admin: true }  ",
                "api/gifts/:id/image    GET",
                "api/orders          POST {GET DELETE, auth: true, same_user: true }",
                "api/orders/:id      {GET PUT DELETE,  auth: true, same_user: true }",
                "api/drivers         {GET POST DELETE, auth: true, admin: true}",   
                "api/drivers/:id     {GET PUT DELETE,  auth: true, admin: true}"        

            ]
        }
        
        
Every end-point have the http method you could use it    
and if **auth is true** you should send **JSON WEB TOKEN** in headers   
if **admin is true** you should use admin account    

this is admin account : 
        
        username: admin
        passowrd: admin 
        or 
        username:kareem
        passowrd:123456

### note   
      you can't create admin account through api you should access to the database
      
## what system can do and can't
**as normal user**   
   1. you could create new user and login
   2. add delete update an order   (**your own orders only**)   
   3. create new user as a Driver 
   
   
**as Admin**
  1. add delete update  driver to the system
  2. add delete update upload  gifts and photos 
  3. add delete update  users to the system
  
## some hypothesis and edge cases
  
 1.a driver could take one order per day only     
 2.there is no check if the two orders are near or on the same place and date 

 
 
 ## what I'm using 
        passport for Authentication
        multer to upload images
        morgan to log what happend
        MVC arch 
        
       
### things with not good implementation
      saveing images at database as buffer  because I haven't credit card to use AWS or any storage
      mark order as complete and update drivers with that  not implemented
      error handlers
      
     
