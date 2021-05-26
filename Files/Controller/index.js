const route=require("express").Router()
import signUp from './signUp/index';
import login from './Login/index';
import { check } from 'express-validator';

route.post('/user/signup',signUp.singUpRequest)
route.post('/user/login',[
check('email',"enter the email").isEmail(),
check('password',"enter the password").not().isEmpty()
],
login.postLogin)

export default route