import {Router} from 'express'
const router: Router = Router()
import {signup, signin, profile} from '../controllers/auth.controller'
import {tokenValidator} from '../libs/validate-token'

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/profile', tokenValidator, profile)

export default router