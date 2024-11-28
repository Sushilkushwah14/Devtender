# DevTinder APIs
## authRouter
-POST /signup
-POST /login
-POST /logout

## ProfileRouter
-GET /profile(view)
-PATCH /profile(edit)
-PATCH /profile(password)

## connectioRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET /user/connections
-GET /user/request/ignored/:requestId
-GET /user/request/recieved/:requestId
-GET /user/request/accepted/:requestId
-GET /user/request/rejected/:requestId
-GET /user/feed-Gets you the profile of other users on platform

Status of apis:ignore,interested,accepted,rejected