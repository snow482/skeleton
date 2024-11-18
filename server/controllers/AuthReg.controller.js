
const bcrypt = require('bcrypt')
const jwtConfig = require('../config/jwtConfig')
const generateTokens = require('../utils/generateTokens')

const UserAuthRegService = require('../services/UserAuthReg.service')

exports.userRegistrationController = async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (email && password && email.trim() === '' || password.trim() === '') {
      console.log('Please, fill the fields');
      return res.status(400).json({ message: 'Please, fill the fields' })
    }
  
    let user = await UserAuthRegService.getUserByEmail(email)
  
    if (!user) {
      user = await UserAuthRegService.addUser({
        email, 
        password: await bcrypt.hash(password, 10)
      })

      delete user.password
      res.locals.user = user

      const { accessToken, refreshToken } = generateTokens({ user })

      res.status(201).cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      }).json({ message: 'success', user, accessToken })
      return
    }
    res.status(400).json({ message: 'This email already existing' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.userAuthorizationController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email && password && email.trim() === '' || password.trim() === '') {
      console.log('Please, fill the fields');
      return
    }

    const user = await UserAuthRegService.getUserByEmail(email)
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password)
      if (comparePassword) {
        delete user.password
        res.locals.user = user

        const { accessToken, refreshToken } = generateTokens({ user })
        res.status(200).cookie(jwtConfig.refresh.type, refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        }).json({ message: 'success', user, accessToken })
        return
      }
    }
    res.status(400).json({ message: 'Email or password is not correct' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.usetLogoutController = async (req, res) => {
  try {
    res.locals.user = null

    res.clearCookie('refreshToken').status(200).json({ message: 'Success logout' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.userRefreshController = async (req, res) => {
  try {
    const { user } = res.locals
    const { accessToken, refreshToken } = generateTokens({ user })
    res.status(200).cookie(jwtConfig.refresh.type, refreshToken, {
      httpOnly: true,
      maxAge: jwtConfig.refresh.expiresIn
    }).json({ message: 'success', user, accessToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}