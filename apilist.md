# DevTinder APIs
## authRouter
-POST /signup
-POST /login
-POST /logout

## ProfileRouter
-GET /profile(view)
-PATCH /profile(edit)
-PATCH /profile(password) //forget password api

## connectioRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId  
   #-POST /request/send/:status/:userId 

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId
   #-POST /request/review/:status/:requestId

## userRouter
-GET /user/request/recieved
-GET /user/connections
-
-GET /user/feed-Gets you the profile of other users on platform

Status of apis:ignore,interested,accepted,rejected