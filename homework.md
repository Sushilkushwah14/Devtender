- Write code with proper validations for POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
- Create GET GET /user/connections

- Logic for GET /feed API
- Explore the $nin, $and, $ne and other query -operatorators
-Pagination

#skip() and limit() functions are used for pagging-

/feed?paage=1&limit=10 = 1-10 = .skip(0) & .Limit(10)

/feed?page=2&limit=10 =11-20 = .skip(10) & .linit(10)

/feed?page=3&limit=10 =21-30 = .skip(20) & .limit(10)

/feed?page=4&limit=10 =31-40 = .skip(30) & .limit(10)

we need to calculate skip() function-
skip=(page-1) * limit;