// Import JWT so we have access to its token methods / functionality
import jwt from 'jsonwebtoken'
// Import our User model b/c we'll need to reference it
import User from '../models/user.model.js'


// Start building our middleware function
const validateSession = async(req, res, next) => {
  // Middleware has access to the request, and response, but also needs the next() function (EXPLAIN NEXT FUNCTION)
  try {

    // We take the token provided by the request object (req.headers.authorization)
    const token = req.headers.authorization
    
    // Check the status of the token (is it expired?)
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)

    // once our token is decoded we have access to the user id (from the payload) and the exp.
    // use .findById() to check for a user that matches the id attaced to our token
    const user = await User.findById(decodedToken.id)

    // If valid, generate a variable that holds the user info.
    if(!user) throw Error('User not found')

    // Create a new key within our request (req) object to store our user information.
    req.user = user

    // Finally we return next() which moves us along to our route. 
    return next()
  } catch (error) {
    res.json({
      error: error.message
    })
  }
}

export default validateSession