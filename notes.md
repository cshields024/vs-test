# MiddleWare #
A function that accesses out request and response objects, before moving on to other aspects of our code. 

- Middleware functions have 3 parameters (request, response, next)
- We will use middleware to build a way to validate a users session



# Validate Session #
Validate session is a middleware process that will verify if a user should be allowed to perform certain actions. 

# Tie Data Together #
Using validate session we will be able to tie our data together. 

- For example, connecting a post with a specific user
- This will allow us to determine things like if the user should be able to delete the post, or edit the post. 
- We will also be able to connect a newly created post with a user. 

## How do we accomplish this? ##
Inside our validate session function we will...
1. Grab the token from the request object
-   `const token = req.headers.authorization`
2. Decode the token
-   `const decodedToken = await jwt.verify(token, process.env.SECRET)`
3. The users _id is attached to the token when we assign it. Now that its decoded we can use .findById() to check for a user that matches the _id attached to the token.
-  `const user = await User.findById(decodedToken.id)`
4. Finally we will create a new key within the request object to store our user information.
-   `req.user = user`


# Testing In Postman #
Once you have a route set up to use your validate session middleware you can test it using postman. 

1. Make sure you have a signed in user and access to the token they have been issued. 

2. In the request section click on 'headers' we will add the Authorization key and give it the value of our token

3. Add a body if necessary and send your request. 
