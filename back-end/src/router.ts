import express from "express"

import AuthController from "./app/auth/controller"
import AccountController from "./app/account/controller"
import UserController from "./app/user/controller"
import CategoryController from "./app/category/controller"
import ProductController from "./app/product/controller"

const api = express.Router()

api.post('/auth/register', AuthController.Register)
api.post('/auth/login', AuthController.Login)
api.get('/auth/token', AuthController.Token)
api.post('/auth/logout', AuthController.Logout)

api.get('/account', AccountController.MyAccount)
api.patch('/account/password', AccountController.ChangePassword)

api.get('/users', UserController.GetUsers)
api.get('/users/:id', UserController.GetUser)
api.patch('/users/:id', UserController.UpdateRole)

api.get('/categories', CategoryController.Get)
api.get('/categories/:id', CategoryController.Show)
api.post('/categories', CategoryController.Create)
api.patch('/categories/:id', CategoryController.Update)
api.delete('/categories/:id', CategoryController.Delete)

api.get('/products', ProductController.Get)
api.get('/products/:id', ProductController.Show)
api.post('/products', ProductController.Create)
api.patch('/products/:id', ProductController.Update)
api.delete('/products/:id', ProductController.Delete)

export default api