const express = require('express');
const axios= require('axios');
const responseTime=require('response-time');
const redis= require('redis');
const {promisify}= require('util');

const client=redis.createClient({
    host: '127.0.0.1',
    port:6379
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

const app = express();

app.use(responseTime());

app.get('/character', async (req, res) => {


    try{
        //Respuesta de la memoria caché
        const reply= await GET_ASYNC(req.originalUrl);
        if(reply){
            return res.json(JSON.parse(reply));
        }
        const response = await axios.get("https://rickandmortyapi.com/api/character");
    
        await SET_ASYNC(req.originalUrl, JSON.stringify(response.data));
                   
        res.json(response.data);  

    }catch (err) {    
        console.log(err);

    } 
});


app.get('/character/:id', async (req, res) => {
    try{
        const reply = await GET_ASYNC(req.originalUrl);
        if(reply){
            return res.json(JSON.parse(reply));
        }

        const response= await axios.get("https://rickandmortyapi.com/api/character/"+ req.params.id);

        await SET_ASYNC(req.originalUrl, JSON.stringify(response.data));

        return res.json(response.data);
    }catch(err){
        return res.status(err.response.status).json({message:err.message});
        console.log(err);
    }
});


app.get('/location', async (req, res) => {

    try{
        //Respuesta de la memoria caché
        const reply= await GET_ASYNC(req.originalUrl);
        if(reply){
            return res.json(JSON.parse(reply));
        }
        const response = await axios.get("https://rickandmortyapi.com/api/location");
    
        await SET_ASYNC(req.originalUrl, JSON.stringify(response.data));
                   
        res.json(response.data);  

    }catch (err) {    
        console.log(err);

    } 
});


app.get('/location/:id', async (req, res) => {
    try{
        const reply = await GET_ASYNC(req.originalUrl);
        if(reply){
            return res.json(JSON.parse(reply));
        }

        const response= await axios.get("https://rickandmortyapi.com/api/location/"+ req.params.id);

        await SET_ASYNC(req.originalUrl, JSON.stringify(response.data));

        return res.json(response.data);
    }catch(err){
        return res.status(err.response.status).json({message:err.message});
        console.log(err);
    }
});

app.get('/episode', async (req, res) => {


    try{
        //Respuesta de la memoria caché
        const reply= await GET_ASYNC(req.originalUrl);
        if(reply){
            return res.json(JSON.parse(reply));
        }
        const response = await axios.get("https://rickandmortyapi.com/api/episode");
    
        await SET_ASYNC(req.originalUrl, JSON.stringify(response.data));
                   
        res.json(response.data);  

    }catch (err) {    
        console.log(err);

    } 
});


app.get('/episode/:id', async (req, res) => {
    try{
        const reply = await GET_ASYNC(req.originalUrl);
        if(reply){
            return res.json(JSON.parse(reply));
        }

        const response= await axios.get("https://rickandmortyapi.com/api/episode/"+ req.params.id);

        await SET_ASYNC(req.originalUrl, JSON.stringify(response.data));

        return res.json(response.data);
    }catch(err){
        return res.status(err.response.status).json({message:err.message});
        console.log(err);
    }
});

app.listen(3000);
