import { Request, Response } from 'express';
import axios from 'axios'

export default async function handleLogin(req: Request, res: Response) {
    const reqdata = req.body
    console.log('Received:', reqdata)

    //Handle the request and send a response
    res.json(reqdata)
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/')
    //res.redirect('http://localhost:3000')
    //res.redirect('https://www.google.com/')
}