#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const clear = require('clear');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

function readFileText(fileName) {
	return fs.readFile(path.resolve(__dirname, fileName), { encoding: 'utf-8' });
}

function sleep(duration) {
	return new Promise(resolve => {
		setTimeout(resolve, duration);
	});
}

const createText = (text) => figlet.textSync(text, {
	font: 'Big'
});

async function getPokemon() {
	let bulbasaurArt = await readFileText('art/bulbasaur.txt');
	let bulbasaur = {
		id: 'bulbasaur',
		name: 'Bulbasaur',
		maskedName: 'Left',
		art: bulbasaurArt,
		color: chalk.greenBright
	};

	let charmanderArt = await readFileText('art/charmander.txt');
	let charmander = {
		id: 'charmander',
		name: 'Charmander',
		maskedName: 'Center',
		art: charmanderArt,
		color: chalk.redBright
	};

	let squirtleArt = await readFileText('art/squirtle.txt');
	let squirtle = {
		id: 'squirtle',
		name: 'Squirtle',
		maskedName: 'Right',
		art: squirtleArt,
		color: chalk.blueBright
	};

	return [
		bulbasaur,
		charmander,
		squirtle
	];
}

async function main() {
	// Get CLI arguments
	let args = process.argv.slice(2);
	let showNames = args.includes('--show-names');

	// Clear screen
	clear();

	// Fetch data
	let pokemon = await getPokemon();

	// Print title
	let pokemonTitleArt = await readFileText('art/pokemon.txt');
	console.log(chalk.yellowBright.bold(pokemonTitleArt));
	console.log('\n\n');

	// Print pokeballs
	let pokeballArt = await readFileText('art/pokeballs.txt');
	console.log(pokeballArt);
	console.log('\n\n');

	// Choose pokemon
	let answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'pokemon-choice',
			message: 'Choose your pokemon!',
			choices: pokemon.map(pokemon => {
				return {
					name: showNames ? pokemon.name : pokemon.maskedName,
					value: pokemon.id
				}
			})
		}
	]);
	let chosenPokemon = pokemon.find(pokemon => pokemon.id === answers['pokemon-choice']);

	// Create suspension
	let beholdText = createText('You have chosen...');
	console.log(beholdText);
	await sleep(1500);

	// Print pokemon choice
	let pokemonNameText = createText(chosenPokemon.name);
	console.log(chosenPokemon.color(chosenPokemon.art));
	console.log(chosenPokemon.color.bold(pokemonNameText));
}

main().catch(console.error);
