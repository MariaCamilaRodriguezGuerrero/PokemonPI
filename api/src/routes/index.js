const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getPokemons}= require("../controllers/getPokemons")
const{getPokemonById}=require("../controllers/getPokemonById")
const{postPokemon}=require("../controllers/postPokemon")
const{getTypes}=require("../controllers/getTypes")

const express = require("express")
const router = Router();

router.get("/pokemons",getPokemons)

router.get("/pokemons/:id",getPokemonById)

router.post("/pokemons",postPokemon)

router.get("/types",getTypes)

module.exports = router;
