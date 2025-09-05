import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home/Home'
import BlogPage from '../Pages/Home/BlogPage'

const Router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/blog/:id',
                element:<BlogPage/>
            }
        ]
    }
])

export default Router