// build the deck of cards

const suits = ['C', 'D', 'H', 'S'];
const values = [[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10],['J',11],['Q',12],['K',13],['A',14]];
// formated this way to calculate winners easier: gives the face cards num values as well
let players = [1,2,3,4,5,6,7]; // min 2 max 7
let stack = [];
let pot = 0;
let bettors = {};
let allIn = {}; 
let allInPot = {};
let betAmount = [];
// create a set for everyone in the game
players.forEach((el,i) => {
	stack.push(Math.abs(Math.floor(Math.random() * 1000)));
	const playerDiv = document.createElement('div');
	playerDiv.className = `player${i+1}`;
	document.querySelector('.firstDeal').appendChild(playerDiv);
const firstImg = document.createElement("IMG");
	firstImg.setAttribute("class", "card1");
const secondImg = document.createElement("IMG");
		secondImg.setAttribute("class", "card2");
		document.querySelector(`.player${i+1}`).appendChild(firstImg);
		document.querySelector(`.player${i+1}`).appendChild(secondImg);
const playerLabel = document.createElement("p");
const text = document.createTextNode(`Player ${i+1}`);
playerLabel.appendChild(text);
document.querySelector(`.player${i+1}`).appendChild(playerLabel);

const stackBox = document.createElement("div");
stackBox.className = 'stackBox';
const stackAmount = document.createTextNode(`${stack[i]}`);
stackBox.appendChild(stackAmount);
document.querySelector(`.player${i+1}`).appendChild(stackBox);

const betArea = document.createElement('div');
	betArea.className = `betArea${i+1}`;
	document.querySelector(`.player${i+1}`).appendChild(betArea);
	betArea.style.position = 'absolute';

const whatBet = document.createElement('div');
	whatBet.className = `whatBet${i+1}`;
	document.querySelector(`.player${i+1}`).appendChild(whatBet);
	whatBet.setAttribute('style', 'position: absolute; left: 40%; top: 20%');

	});


function init(begginerPlayer) {

	// check to see if any stack has zero if they do remove them from the game
	stack.forEach((el,i) => {
		if (el ===0) {
			document.querySelector(`.player${i+1}`).classList.add('folded');
			delete bettors[i+1];
			betCount --;
		}
	})

	if (begginerPlayer ===0) {
		begginerPlayer =players.length;
	}

	let small = begginerPlayer-2;
	let big = begginerPlayer-1;

	if (begginerPlayer===1) {
		small = players.length-1;
		big = players.length;
	}
	if (begginerPlayer ===2) {
		small = players.length;
	}


	document.querySelector('.firstDeal').childNodes.forEach((el,i) => {
		// the first is text
		if (i>0) {
		if (el.classList.contains('folded')  && i===big) {
			big++;
			begginerPlayer++;
		}

	}

	});

// to make an big blind and small blind

const bigBlindLabel = document.createElement('div')
bigBlindLabel.className = 'bigBlindLabel';
document.querySelector(`.player${big}`).appendChild(bigBlindLabel);
bigBlindLabel.style.position = 'absolute';
bigBlindLabel.innerHTML = 'Big Blind';

const smallBlindLabel = document.createElement('div')
smallBlindLabel.className = 'smallBlindLabel';
document.querySelector(`.player${small}`).appendChild(smallBlindLabel);
smallBlindLabel.style.position = 'absolute';
smallBlindLabel.innerHTML = 'Small Blind';
const bigBlind = document.querySelector(`.player${big}`).querySelector(`.betArea${big}`);

let bigBlindValue = 10;
let smallBlindValue = bigBlindValue/2;
if (stack[big-1] < bigBlindValue) {
	bigBlindValue = stack[big-1];
	allIn[big] = bigBlindValue;
}

if (stack[small-1] <smallBlindValue) {
		smallBlindValue = stack[small-1];
		allIn[small] = smallBlindValue;
	}
stack[big-1] -= bigBlindValue;
stack[small-1] -= smallBlindValue;



bigBlind.textContent = bigBlindValue;
bettors[big] = bigBlindValue;
betAmount.push(bigBlindValue);

const smallBlindBetArea = document.createElement('div');
smallBlindBetArea.className = `betArea${small}`;
document.querySelector(`.player${small}`).appendChild(smallBlindBetArea);
smallBlindBetArea.style.position = 'absolute';

const smallBlind = document.querySelector(`.player${small}`).querySelector(`.betArea${small}`);


smallBlind.textContent = smallBlindValue;
bettors[small] = smallBlindValue;
betAmount.push(smallBlindValue);

pot += bigBlindValue + smallBlindValue;

stack[big-1] -= bigBlindValue;
stack[small-1] -= smallBlindValue;

document.querySelector(`.player${big}`).querySelector('.stackBox').textContent -= bigBlindValue;
document.querySelector(`.player${small}`).querySelector('.stackBox').textContent -= smallBlindValue;

// make a pot HTML

document.querySelector(`.potBox`).textContent = +document.querySelector(`.potBox`).textContent + pot;


// make an active class;
document.querySelector(`.player${begginerPlayer}`).classList.add('active');
const buttonR = document.createElement("BUTTON");
const buttonC = document.createElement("BUTTON");
const buttonF = document.createElement("BUTTON");
const raise = document.createTextNode(`Raise`);
const check = document.createTextNode(`Call`);
const fold = document.createTextNode(`Fold`);
buttonR.className = "raise";
buttonC.className = "check";
buttonF.className = "fold";

buttonR.appendChild(raise);
buttonC.appendChild(check);
buttonF.appendChild(fold);

document.querySelector(`.player${begginerPlayer}`).appendChild(buttonR);
document.querySelector(`.player${begginerPlayer}`).appendChild(buttonC);
document.querySelector(`.player${begginerPlayer}`).appendChild(buttonF);
const raiseBar = document.createElement("input");
const raiseBtn = document.createElement("div");

raiseBar.setAttribute('id','raiseSlide');
raiseBar.setAttribute('type','range');
raiseBar.setAttribute('min',bigBlindValue);
raiseBar.setAttribute('max',stack[begginerPlayer-1]);
raiseBar.setAttribute('value',bigBlindValue*2);
raiseBtn.className = 'sliderNumber';
document.querySelector(`.active`).appendChild(raiseBar);
buttonR.appendChild(raiseBtn);

raiseBtn.textContent = bigBlindValue*2;



// allow for instances of big Blind/small blind taking them over the all in limit


const inputRaise = document.createElement("input");
inputRaise.className = 'inputRaise';
const placeholder = document.createAttribute('placeholder');
placeholder.value = 'Amount';
inputRaise.setAttributeNode(placeholder);
const onkeydown = document.createAttribute('onkeydown');
onkeydown.value = "inputRaiseFun(this)";
inputRaise.setAttributeNode(onkeydown);
const inputType = document.createAttribute('type');
inputType.value = "number";
inputRaise.setAttributeNode(inputType);
const inputMax = document.createAttribute('max');
inputMax.value = stack[begginerPlayer-1];
inputRaise.setAttributeNode(inputMax);
const inputMin = document.createAttribute('min');
inputMin.value = bigBlindValue;
inputRaise.setAttributeNode(inputMin);

// so that if I raise the bar the value goes up on both the amount and regular
raiseBar.oninput = function(){
	raiseBtn.textContent = `${this.value}`;
	inputRaise.value = this.value;

}
// if I input range then the regular will go up and the bar will go up
inputRaise.oninput = function() {
	if (Number(this.value) <= Number(this.max)) {
	raiseBtn.textContent = `${this.value}`;
	inputRaise.value = this.value;
	raiseBar.value = this.value;
}	else {
	raiseBtn.textContent = `${this.max}`;
	inputRaise.value = this.max;
	raiseBar.value = this.max;
}


	if (this.value.length ===0) {
		raiseBtn.textContent = `${this.min}`;
	inputRaise.value = this.min;
	raiseBar.value = this.min;
	}

}


document.querySelector(`.player${begginerPlayer}`).appendChild(raiseBar);
document.querySelector(`.player${begginerPlayer}`).appendChild(inputRaise);


// because the first player needs to call the big blind
const callNum = document.createElement('div');
callNum.className = 'callNum';
callNum.textContent = bigBlindValue;

buttonC.appendChild(callNum);
const allActives = document.querySelectorAll('.active');
if (allActives.length>1) {
	for (let i=0; i<allActives.length;i++) {
		if (allActives[i].className.substring(6,7) != begginerPlayer) {
			allActives[i].classList.remove('active');
		}
	
		}
		}



}



init(1);





class Card {
	constructor(suit, value) {
		this.suit = suit;
		this.value = value[0];
		this.numValue = value[1];
		this.card = value[0]+ suit;
	}
}



class Deck {
	constructor() {
		this.deck = [];
		this.allCards = [];
	}


createDeck(suits, values) {
		for (let suit of suits) {
			for (let value of values) {
				this.deck.push(new Card(suit, value));
			}
		}

		return this.deck;
	}

	// shuffle it

	shuffle() {
		let counter = this.deck.length, temp, i;

		while(counter) {
			i = Math.floor(Math.random() * counter--);
			temp = this.deck[counter]; // to flip the array
			this.deck[counter] = this.deck[i];
			this.deck[i] = temp;
		}

		return this.deck;
	}

	// deal the players hands based on how many players

	deal() {

		let hand = [];
		while(hand.length <players.length *2) {
			hand.push(this.deck.pop());
		}

		let playersHands = [];
		for (let i=0; i<hand.length; i+= 2) {
			playersHands.push(hand.slice(i, i+2));

		}


		// need to create playerclasses in html
		
		for (let i=1; i<players.length +1; i++) {

		document.querySelector(`.player${i}`).querySelector('.card1').setAttribute("src", `PNG/purple_back.png`);
		document.querySelector(`.player${i}`).querySelector('.card2').setAttribute("src", `PNG/purple_back.png`);

	}

	// to reset the deck so no one can see
		document.getElementById('flopImg1').src = `PNG/purple_back.png`;
		document.getElementById('flopImg2').src = `PNG/purple_back.png`;
		document.getElementById('flopImg3').src = `PNG/purple_back.png`;
		document.getElementById('turnImg').src = `PNG/purple_back.png`;
		document.getElementById('riverImg').src = `PNG/purple_back.png`;



		this.allCards.push(playersHands);
		return playersHands;

		// have a spot for the pot
		
}


	flop() {
		// if at least two people have bet do the flop
		let flop = [];
		while(flop.length < 3) {
			flop.push(this.deck.pop());

		}

		const firstFlop = flop[0].card;
		const secondFlop = flop[1].card;
		const thirdFlop = flop[2].card;

		document.getElementById('flopImg1').src = `PNG/${firstFlop}.png`;
		document.getElementById('flopImg2').src = `PNG/${secondFlop}.png`;
		document.getElementById('flopImg3').src = `PNG/${thirdFlop}.png`;
		this.allCards.push(flop);
		return flop;

	}

	turn() {
		let turn = [];
		turn.push(this.deck.pop());

		document.getElementById('turnImg').src = `PNG/${turn[0].card}.png`;
		this.allCards.push(turn);
		return turn;
	}

	river() {
		let river = [];
		river.push(this.deck.pop());

		document.getElementById('riverImg').src = `PNG/${river[0].card}.png`;
		this.allCards.push(river);
		return river;
	}

	winning(pot,stack) {



		// this method allows me to not have to call all the functions above like I had it previously.
		let allCards = [].concat.apply([],this.allCards);

		for (let key in bettors) {
			const eachPlayerClass = document.querySelector('.player'+ key);
		
		
		const firstCard = allCards[key-1][0].card;
		const secondCard = allCards[key-1][1].card;
		eachPlayerClass.children[0].src = `PNG/${firstCard}.png`;
		eachPlayerClass.children[1].src = `PNG/${secondCard}.png`;

	}
		

		const flopIndex = players.length;
		const flop1 = allCards[flopIndex];
		const flop2 = allCards[flopIndex+1];
		const flop3 = allCards[flopIndex+2];
		const turn = allCards[flopIndex +3];
		const river = allCards[flopIndex +4];

		let eachPlayerCards = [];
		let eachPlayerObj = [];
		let eachPlayerWinner = [];
		for (let i=0; i<players.length; i++) {
		eachPlayerCards.push([allCards[i][0], allCards[i][1], flop1, flop2, flop3, turn,river]);
		eachPlayerObj.push({
			pairs: {},
			suits: {
				C: [],
				S: [],
				H: [],
				D: [],
			},
			straightArr: [],
			flush: {
			flushArr: [],
			},
		});
		// each will have a object that collects the cards they have 
		eachPlayerWinner.push({
			royalFlush: {
				has: false,
				array: [],

			},
			straightFlush: 
			{
				has: false,
				sum: 0,
				array: [],
				value: 0,
			},
			fourOfAKind: {
				has: false,
				sum: 0,
				value: 0,
				array: [],
			},
			fullHouse: {
				has: false,
				sum: 0,
				value: 0,
				array: [],
			},
			flush: {
				has: false,
				sum: 0,
				array: [],
			},
			straight: {
				has: false,
				sum: 0,
				array: [],
			},
			threeOfAKind: {
				has: false,
				sum: 0,
				value: 0,
				array: [],
			},
			twoPair: {
				has: false,
				sum: 0,
				value: 0,
				array: [],
			},
			onePair: {
				has: false,
				sum: 0,
				value: 0,
				array: [],
			},
			highCard: {
				has: false,
				value: 0,
				array: [],
			},

		});
		// each will have a winner object
	}
		
		const resultFunction = function (obj) {
			// to count the values for pairs
			if (this.pairs[obj.numValue] === undefined) {
				this.pairs[obj.numValue] =1;
				this.straightArr.push(obj.numValue); // this is for straights
				if (obj.value === "A") {
					// to take in account for A being low as well
					this.straightArr.push(1);
				}
				
			} else {
				this.pairs[obj.numValue] ++;
			

			}


			// this is for flushes addining the amount of suits
			let suitArr = [];
			if (this.suits[obj.suit] === []) {
				this.suits[obj.suit].push(obj.numValue);
			} 
			else {
				this.suits[obj.suit].push(obj.numValue);

				if (this.suits[obj.suit].length > 4) {
					this.flush.flushArr = this.suits[obj.suit];
					this.flush.suit = obj.suit;
				} 
			}
		}

		// do this for every player
		eachPlayerCards.forEach((el,index) => el.forEach(resultFunction,eachPlayerObj[index]))
		// this gets me the player objects for everyone
		// to sort the straights and the flush arrays
		const straightSorter = function(a,b) {
			return (a-b);
		}

	// sort every player objects striaght array and flush array
	eachPlayerObj.forEach(el => {
	el.straightArr.sort(straightSorter);
	el.flush.flushArr.sort(straightSorter);
	});


	// this will give the players their winning hand
		// the object is the EachplayerObj
		const winningCalc = function(obj, resultObj) {
			// iterate over the pairs array to get pairs/ three of a kind/ four of a kind/ full house
			// to sort all the new arrays
			const straightSorterCalc = function(a,b) {
			return (b-a);
		}
			for (let key in obj.pairs) {
				let value = parseInt(key);

				// one pair & two pair
				if (obj.pairs[key] ===2) {
					resultObj.onePair.has = true;
					resultObj.onePair.sum ++;
					resultObj.onePair.array.push(value,value);
					if (resultObj.onePair.sum ===2) {
						resultObj.twoPair.has = true;
						resultObj.twoPair.sum = 1;
						resultObj.twoPair.array = resultObj.onePair.array.sort(straightSorterCalc);
						resultObj.onePair.has = false;
						
					}

					if (resultObj.onePair.sum ===3) {
						// I need to itereate over the two pair array and remove the lowest ones
						const minPair = Math.min(...resultObj.onePair.array);
						const trimedTwoPair = resultObj.twoPair.array.filter(el =>  el > minPair);
						resultObj.twoPair.array = trimedTwoPair.sort(straightSorterCalc);
						resultObj.onePair.has = false;

					}
				}

				// three of a kind
				if (obj.pairs[key] ===3) {
					resultObj.threeOfAKind.has = true;
					resultObj.threeOfAKind.array.push(value,value,value);
					resultObj.threeOfAKind.sum ++;

				}

				// four of a kind
				if (obj.pairs[key] ===4) {
					resultObj.fourOfAKind.has = true;
					resultObj.fourOfAKind.array.push(value,value,value,value);

				} 

				else  {
					resultObj.highCard.value = obj.straightArr[obj.straightArr.length-1];
					resultObj.highCard.array = obj.straightArr;
					resultObj.highCard.has = true;
					
				}
			}
			// full house
			if ((resultObj.threeOfAKind.has) && (resultObj.onePair.sum > 0)) {
						resultObj.fullHouse.has = true;
						resultObj.fullHouse.array = resultObj.threeOfAKind.array.concat(resultObj.onePair.array);
						if (resultObj.onePair.sum ===2) {
						// I need to itereate over the two pair array and remove the lowest ones
						const minPairFull = Math.min(...resultObj.fullHouse.array);
						const trimedFull = resultObj.fullHouse.array.filter(el =>  el > minPairFull);

					}
						resultObj.onePair.array = [];
						resultObj.onePair.has = false;
						resultObj.twoPair.array = [];
						resultObj.twoPair.has = false;
						resultObj.threeOfAKind.array = [];
						resultObj.threeOfAKind.has = false;

					}

			if (resultObj.threeOfAKind.sum ===2) {
				resultObj.fullHouse.has = true;
				resultObj.threeOfAKind.array.sort(straightSorterCalc).pop();
				resultObj.fullHouse.array = resultObj.threeOfAKind.array;
					resultObj.onePair.array = [];
						resultObj.onePair.has = false;
						resultObj.twoPair.has = false;
						resultObj.threeOfAKind.has = false;
			}

			// for flushes
			if (obj.flush.flushArr.length !==0) {
			
			// then create the flush
				resultObj.flush.has = true;
			// also make it only 5 if they have more
			if (obj.flush.flushArr.length > 5) {
				while (obj.flush.flushArr.length > 5) {
					obj.flush.flushArr.shift();
				}
			}

			resultObj.flush.array = obj.flush.flushArr;
				
			}



			// for straights
			// iterate over the straight array
			// if [i] - [i-1] === -1 then push i into a new array
			// count the length of the new array
			// if the length >=5 then straight is true
			// It'll create a function in case of straight flushes as well
			const straightFunction = function(arr, obj) {
			let straight = [];
			for (let i=0; i< arr.length; i++) {
				if (arr[i] +1 === arr[i+1]) {
					straight.push(arr[i],arr[i+1]);
				}
				// to capture both ^

			}
				// to remove duplicates
				straight = [...new Set(straight)];
	
				let j = 0;
				while (j <straight.length) {

				// need to itereate over this array to see if it is still a straight
				for (let i=0; i <straight.length; i++) {
					
					if ((straight[i] +1 !== straight[i+1]) && (straight[i+1] !== undefined)) 
						// this checks if there isn't a true striaght and makes sure that the first 5 could be a striaght
					if (i+1 ===6) {
						straight.pop();
					} else
					{
						straight.splice(i,1);
					}
				}

				j ++;

			}


			while (straight.length > 5) {
				straight.shift();
			}
			// this is to get the highest array of straight

			if (straight.length === 5) {
				obj.has = true;
				obj.array = straight;
			}

		}


		straightFunction(obj.straightArr, resultObj.straight);
		straightFunction(obj.flush.flushArr, resultObj.straightFlush);


		if (resultObj.straightFlush.has) {
			if (JSON.stringify(resultObj.flush.array) === JSON.stringify([10,11,12,13,14])) {
				resultObj.royalFlush.has = true;
				resultObj.royalFlush.array = resultObj.straight.array;
				resultObj.straightFlush.has = false;
				resultObj.straightFlush.array = [];
			}
		}

		//to push in the remaing values into the arrays for best hand they have
		// itereate over the object's values

		for (let key in resultObj) {

		if (resultObj[key].array.length !== 0 && (resultObj[key].array.length < 5)) {
			for (let i = obj.straightArr.length-1; i>-1; i--) {
			while (resultObj[key].array.length <5) {
					if (resultObj[key].array.includes(obj.straightArr[i])) {
						break;
					}

					// if it already includes it skip
					// if not then push it in!

					else resultObj[key].array.push(obj.straightArr[i]);

				}
			}

		// itereatee over the striaght array backwards
	}

		// if the lengths are not zero and not 5 then there is something in them but we need to get them to 5
		// if they are zero them leave them becuase they are not "active"
		// use the existing array
			// while the length is not 5
			// push in the remaing elements from the straight array that are not in there already from highest

		// check to see if it they only have a high card
		// itereate over the object
		
	}	

		


		}

		// this will call the function on each player obj and populate the eachplayer winner obj

		for (let i=0; i<players.length; i++) {
			winningCalc(eachPlayerObj[i], eachPlayerWinner[i]);
		}
	

		// next were going to check what players have
		// first make the player winner has value false once it has it
		eachPlayerWinner.forEach(el => {
			const values = Object.values(el);
			// itereate over the array
			for (let i=0; i<values.length; i++) {
				// once it has it make the rest of the array false
				// I can do this because the object values are in order of importance
				if (values[i].has) {
					for (let j=i+1; j<values.length;j++) {
						values[j].has = false;
					}
				}
			}
		})

		// now calculate what every player has and how valuable that hand is
		// do this for only the players that are still in!
		// whoBet is the indexes that have bet


		let winnerArr = [];
		let winnerArr2 = [];
		let winnerArr3 = [];
		eachPlayerWinner.forEach((el) => {
			// this gets the array of keys
			const keys = Object.keys(el);
			for (let key in el) {
				if (el[key].has) {
					winnerArr.push(key);
					winnerArr3.push(el[key].array);
					// this third array will be for tie breakers
				}
			}
			// loop over the keys to see what it matches
			for (let i=0; i<keys.length;i++) {
				for (let j=0; j<winnerArr.length;j++) {
					if (keys[i] === winnerArr[j]) {
						winnerArr2[j] = i;
					}
				}
			}
		});


		// make the winnerArr2 different if people haven't bet. Only make it so the people who have bet have numbers
		// I want to itereatee ove the winnerArr
		// if whoBet 
		//change all the winnerArr values that are not at the index of the whoBets to 10
		// now if they don't bet they will automatically have a higher value



		
			for (let i=0; i< winnerArr2.length; i++) {
			if (!bettors[i+1] && bettors[i+1] !==0) {
				winnerArr2[Math.abs(i)] = 10;
			}
		}
		

		// now have an all In bet
		// if there is an all In bet
		// check to see whose values are greater than the lowest
		// do the winning calculation 

		// itereate over the winnerArr 2 to see who won
		let lowestValue = winnerArr2[0];
		let condensedArr = [];
		let winnerIndex = [];
		let winnersArr = [];
		let winnerHands = [];
		for (let i=0; i<winnerArr2.length;i++) {
			if (winnerArr2[i] < lowestValue) {
				lowestValue = winnerArr2[i];
			}
		}


		

		for (let i=0; i<winnerArr2.length;i++) {
			if (winnerArr3[i].length >5 ) {
				while (winnerArr3[i].length > 5) {
					winnerArr3[i].shift();
				}
			}
		}

		// ^^ this gets the lowest and now I can tell you who won
		// I am also pushing in values

		for (let i=0; i<winnerArr2.length;i++) {
			if (winnerArr2[i] === lowestValue) {
				condensedArr.push(winnerArr2[i]);
				winnerIndex.push(i);
				winnersArr.push(winnerArr3[i]);
				winnerHands.push(winnerArr[i]);
			} else {
				delete winnerArr3[i];
			}
		}

		


	// get tie breakers
	// this is for all the "pairs"
	// "pairs" is for one pair, two pair, three of a kind, 4 of a kind, full house
	const pairsTie = function() {
		// for pairs
			// itereate backwards because we are splicing
			for (let i=winnersArr.length-1; i>0;i--) {
			// then check the highest cards
			// if the first card is higher than the rest then we know they have the highest pair so they win
			if (winnersArr[i][0] > winnersArr[i-1][0]) {
				winnersArr.splice(i-1,1);
			}

			else if (winnersArr[i][0] < winnersArr[i-1][0]) {
				winnersArr.splice(i,1); 
			}

			// else if they have a tie then we need to check the next highest cards
			// this runs in to problems if there are two of the same hands. it will then keep one of the pairs that is the same
			// weather it is higher or not
			else if (winnersArr[i][0] === winnersArr[i-1][0]) {
				for (let j=2;j<5;j++) {
				if (winnersArr[i][j] > winnersArr[i-1][j]) {
				winnersArr.splice(i-1,1);
				break;
			}

			else if (winnersArr[i][j] < winnersArr[i-1][j]) {
				winnersArr.splice(i,1);
				break;
			}

			else continue;

		}

			}
		}
	}
	const highCards = function() {
			for (let i=condensedArr.length-1; i>0;i--) {
			// then check the highest cards
			if (winnersArr[i][4] > winnersArr[i-1][4]) {
				winnersArr.splice(i-1,1);
			}

			else if (winnersArr[i][4] < winnersArr[i-1][4]) {
				winnersArr.splice(i,1);
			}

			else if (winnersArr[i][4] === winnersArr[i-1][4]) {
				for (let j=3; j>=0;j--) {
					if (winnersArr[i][j] > winnersArr[i-1][j]) {
						winnersArr.splice(i-1,1);
						break;
					} 

					else if (winnersArr[i][j] < winnersArr[i-1][j]) {
					winnersArr.splice(i,1);
					break;
					}
					else continue;
				}
			}

		
		}
	}

	const straightTie = function() {
		for (let i=winnersArr.length-1; i>0;i--) {
			// then check the highest card. the highest card in a straight wins. nothing else.
			if (winnersArr[i][4] > winnersArr[i-1][4]) {
				winnersArr.splice(i-1, 1);
			}
			else if (winnersArr[i][4] < winnersArr[i-1][4]) {
				winnersArr.splice(i, 1);
				}

			else continue;
		}
	}


	if (condensedArr.length > 1) {
		// then we need a tie breaker
		// for the pairs
		if (condensedArr[0] === 8 || condensedArr[0] === 7 || condensedArr[0] === 6 || condensedArr[0] === 3 || condensedArr[0] === 2) {
			pairsTie();
			if (winnersArr.length > 1) {
				pairsTie();
			}
		}

		if (condensedArr[0] === 5 || condensedArr[0] === 1) {
			// for straight's
			
			// then check the highest card. the highest card in a straight wins. nothing else.
			for (let i=0; i<condensedArr.length;i++) {

			straightTie();

		}

	}
		if (condensedArr[0] === 4 || condensedArr[0] === 9) {
			// for flushes and high cards
			// for them we will check high cards going backwards because that how they are organized
			highCards();

			if (winnersArr.length > 1) {
				highCards();
			}
		}
		/*
		if (condensedArr[0] === 0)
			// royal flush
			// then the winnersArr is already all of them. You can't have a "higher" royal flush
		*/
	}
		// now I need to itereate over all the winning objects to see who would win
	
	let final = [];
	const winnersCircle = document.createElement('div');
	winnersCircle.className = 'winnersCircle';
	// could have the same cards even though they didn't bet; need to delete the winner3 array if they didn't bet
	for (let i=0; i< winnerArr3.length; i++) {
		if (JSON.stringify(winnerArr3[i]) === JSON.stringify(winnersArr[0])) {
			final.push(i+1);
		}
	}

	function unSnake(word) {
	let result = '';
		for (let i=0; i<word.length;i++) {
			if (word[i] === word[i].toUpperCase()) {
				result += ' ' + word[i];
			} else result += word[i];
		}
		return word[0].toUpperCase() + result.slice(1);
	} 


	for (let j=0; j <final.length; j++) {
		stack[final[j]-1] += pot/(final.length);
		if (final.length >1) {
			winnersCircle.textContent = `Player ${final.join(' and ').trim()} win ${pot/final.length} with ${winnerHands[0]}`;
		} else winnersCircle.textContent = `Player ${final[0]} wins $${pot} with ${unSnake(winnerHands[0])}`;

	}



	document.querySelector('.main').appendChild(winnersCircle);

	pot = 0;
	document.querySelector(`.potBox`).textContent = `${pot}`;

	for (let i=1; i<players.length+1; i++) {
			document.querySelector(`.player${i}`).children[3].textContent = `${stack[i-1]}`;
	}


	


		/* Rules

		1. Royal Flush

		2. Straight flush (with highest card)

		3. Four Of A Kind (with highest card)

		4. Full House (with highest card)

		5. Flush (with highest card)

		6. Stright (with higest card)

		7. Three of A kind (with highest card)

		8. Two pair (with highest card)

		9. One pair (with highest card)

		10. High card
		*/
		// end of winning class
		}

		showCard(winner) {
		const hand = this.allCards[0][winner-1];
		const winnerQuery = document.querySelector(`.player${winner}`)
		const showCard = document.createElement("BUTTON");
		const noShow = document.createElement("BUTTON");
		showCard.className = 'showCard';
		noShow.className = 'noShow';
		showCard.textContent = 'Show Card';
		noShow.textContent = `Don't Show`;
		winnerQuery.appendChild(showCard);
		winnerQuery.appendChild(noShow);

		document.querySelector('.showCard').addEventListener('click', function() {
			winnerQuery.querySelector('.card1').src = `PNG/${hand[0].card}.png`;
			winnerQuery.querySelector('.card2').src = `PNG/${hand[1].card}.png`;
		});

		document.querySelector('.noShow').addEventListener('click', function() {
			winnerQuery.classList.add('folded');
		});

		}


		
}

let deck = new Deck(suits, values);
let numberOfGames = 0;


const newGame = function() {

if (numberOfGames===0) {

deck.createDeck(suits, values);

deck.shuffle();

deck.deal();


}

if (numberOfGames >0) {
setTimeout(() => {
deck = new Deck(suits, values);
deck.createDeck(suits, values);
deck.shuffle();
deck.deal();



betCount = players.length;

pot = 0;
allIn = {};
allInPot ={};
bettors = [];
betAmount = [];
const thisbigBlind = document.querySelector('.bigBlindLabel');
const thissmallBlind = document.querySelector('.smallBlindLabel');
document.querySelectorAll('.folded').forEach(player => player.classList.remove('folded'));

thisbigBlind.parentNode.removeChild(thisbigBlind);
thissmallBlind.parentNode.removeChild(thissmallBlind);

if (document.querySelector('.showCard')) {
const showCard = document.querySelector('.showCard');
const noShow = document.querySelector('.noShow');

showCard.parentNode.removeChild(showCard);
noShow.parentNode.removeChild(noShow);

}


if (document.querySelector('.winnersCircle')) {
	while (document.querySelector('.winnersCircle')) {
document.querySelector('.main').removeChild(document.querySelector('.winnersCircle'));
}
}



init(numberOfGames%players.length);
// to make the person active


	flop = false;
	turn = false;
	river = false;
	winning = false;

	
	bet();

},10000);

}

numberOfGames++;

// make them reactive with the first active being the one infront of big blind

}

newGame();

// now to calculate the bets


const nextPlayer = function() {

let maxRaise = 0;

if (Object.keys(bettors).length > 0) {
	
	// itereate over the array to see what the highest bet is
	// using plus two because of big and small blind
	maxRaise = Object.values(bettors).reduce((maxNum, el) => {
		if (maxNum < el) {
			maxNum = el;
		}
		return maxNum;
	}, 0);
}



for (let i=1; i<=players.length; i++) {


if (document.querySelector(`.player${i}`).classList.contains('active')) {
document.querySelector(`.player${i}`).classList.remove('active');
// this is to remove all the other buttons as well
const buttons = document.querySelector(`.player${i}`);

// get rid of buttons and input elements
buttons.querySelectorAll('button, input').forEach(el => {
	buttons.removeChild(el);
})


document.querySelector(`.player${i%players.length +1}`).classList.add('active');


const buttonR = document.createElement("BUTTON");
const buttonC = document.createElement("BUTTON");
const buttonF = document.createElement("BUTTON");
const raise = document.createTextNode(`Raise`);
const check = document.createTextNode(`Call`);
// just to change the name of it and if someone has bet see how much they have




// it's moving to the next player before the flop in the flop and turns I have called next player function

const fold = document.createTextNode(`Fold`);
buttonR.className = "raise";
buttonC.className = "check";
buttonF.className = "fold";

buttonR.appendChild(raise);
buttonC.appendChild(check);
buttonF.appendChild(fold);


document.querySelector(`.active`).appendChild(buttonR);
document.querySelector(`.active`).appendChild(buttonC);
document.querySelector(`.active`).appendChild(buttonF);

// raise inputSlide
const raiseBar = document.createElement("input");
const raiseBtn = document.createElement("div");

raiseBar.setAttribute('id','raiseSlide');
raiseBar.setAttribute('type','range');
raiseBar.setAttribute('min',maxRaise);
raiseBar.setAttribute('max',stack[i%players.length]);
raiseBar.setAttribute('value',maxRaise +1);
raiseBtn.className = 'sliderNumber';
document.querySelector(`.active`).appendChild(raiseBar);
buttonR.appendChild(raiseBtn);
if (i===players.length) {
i = 0;
}
if (maxRaise*2 < stack[i]) {
	raiseBtn.textContent = maxRaise*2;
	// this is for when flop turn and river happens
	if (maxRaise ===0) {
		if (pot < stack[i]) {
			raiseBtn.textContent = Math.floor(pot/2);
		} else raiseBtn.textContent = Math.floor(stack[i]/4);
		


	}
} else if (maxRaise*2 > stack[i]) {
	raiseBtn.textContent = stack[i];
} if (maxRaise >= stack[i]) {
	buttonR.disabled = true;
	buttonR.style.display = 'none';
}


// create inputRaise

const inputRaise = document.createElement("input");
inputRaise.className = 'inputRaise';
const placeholder = document.createAttribute('placeholder');
placeholder.value = 'Amount';
inputRaise.setAttributeNode(placeholder);
const onkeydown = document.createAttribute('onkeydown');
onkeydown.value = "inputRaiseFun(this)";
inputRaise.setAttributeNode(onkeydown);
const inputType = document.createAttribute('type');
inputType.value = "number";
inputRaise.setAttributeNode(inputType);
const inputMax = document.createAttribute('max');
inputMax.value = stack[i%players.length];
inputRaise.setAttributeNode(inputMax);
const inputMin = document.createAttribute('min');
inputMin.value = maxRaise;


// so that if I raise the bar the value goes up on both the amount and regular
raiseBar.oninput = function(){
	raiseBtn.textContent = `${this.value}`;
	inputRaise.value = this.value;

}
// if I input range then the regular will go up and the bar will go up
inputRaise.oninput = function() {
	if (Number(this.value) <= Number(this.max)) {
	raiseBtn.textContent = `${this.value}`;
	inputRaise.value = this.value;
	raiseBar.value = this.value;
}	else {
	raiseBtn.textContent = `${this.max}`;
	inputRaise.value = this.max;
	raiseBar.value = this.max;
}

	if (this.value.length ===0) {
	raiseBtn.textContent = `${this.min}`;
	inputRaise.value = this.min;
	raiseBar.value = this.min;
	}

}


document.querySelector(`.active`).appendChild(raiseBar);
document.querySelector(`.active`).appendChild(inputRaise);


// create html incase of calling
const callNum = document.createElement('div');
callNum.className = 'callNum';
callNum.textContent = maxRaise - document.querySelector(`.betArea${i+1}`).textContent;
if (callNum.textContent > stack[i]) {
	document.querySelector('.check').textContent = 'All In';
	callNum.textContent = stack[i];

}
if (callNum.textContent === '0') {
	document.querySelector('.check').textContent = 'Check';
	callNum.style.display = 'none';
}

buttonC.appendChild(callNum);


inputRaise.setAttributeNode(inputMin);

bet();


break;



}

}

}

// this function will allow people to raise fluidily

// const scrollBet = function() {

// let testDiv = document.querySelector('.raiseBar');

// let scrollbtn = document.querySelector('.scrollBtn');

// let isDragging = false;
// let down = 0;
// let percent = 0;
// // when they click on the button it will trigger
// scrollbtn.addEventListener('mousedown', e => {
// 	down = e.offsetY;
// 	isDragging = true;
// });
// // they will be able to drag it only in the raisebar div
// testDiv.addEventListener('mousemove', e => {
// 	if (isDragging === true) {
// 		if (e.layerY-down <=40) {
// 		scrollbtn.style.marginTop = (e.layerY)-down +'px';
// 		percent = 100-(2.5*(e.layerY-down)); // this will give me a percent of how much they want to wager
		
		
// 		if (e.layerY-down-1 <0) {
// 			scrollbtn.style.marginTop = 0;
// 			percent = 100;
// 			// did this so that it can easily jump to 100 if someone wants to risk that much
// 		};
// 	} 

// 	} 
// });
// // when released the poistion is where we left it and it is not dragging anymore
// window.addEventListener('mouseup', e=> {
// 	if (isDragging === true) {
// 		y=e.offsetY;
// 		isDragging = false;
// 	}
// });

// }




// this is for input raising 
const inputRaiseFun = function(el) {
	const playerRaiseButton = el.parentNode.querySelector('.raise');
	const i = Number(el.parentNode.className.replace('player','').replace('active',''));
	if (Number(el.value) > Number(el.min)) {
		el.style.background = 'white';
	}
	if(event.key === 'Enter') {
		if (Number(el.value) < Number(el.min)) {
			el.style.background = 'red';
			return false;
		} else {
			if (stack[i-1] >0) {
	const amount = el.value;
	// too calcuale raising / callinig
	const maxCall = Object.values(bettors).reduce((max,el) => {if (el > max) {
		max = el}
		return max},0);
		if (amount == maxCall) {
		document.querySelector(`.whatBet${i}`).textContent = 'Call';
		document.querySelector(`.whatBet${i}`).style.display = 'block';
	} else if (amount > maxCall) {
	document.querySelector(`.whatBet${i}`).textContent = 'Raise';
	document.querySelector(`.whatBet${i}`).style.display = 'block';
	}

	pot += Number(playerRaiseButton.children[0].textContent); 
	stack[i-1] = stack[i-1] - playerRaiseButton.children[0].textContent;
	document.querySelector(`.active`).children[3].textContent = `${stack[i-1]}`;
	bettors[i] = Number(playerRaiseButton.children[0].textContent);
	} 
	document.querySelector(`.potBox`).textContent = `${pot}`;
	document.querySelector(`.betArea${i}`).textContent = Number(playerRaiseButton.children[0].textContent);
	setTimeout(() => {
		document.querySelector(`.whatBet${i}`).style.display = 'none';
	},2000);
	nextPlayer();

			
		}
	}
}

// this will make sure that atleast everyone has gotten there chance to bet
let betCount = players.length;
let flop = false;
let turn = false;
let river = false;
let winning = false;

const bet = function() {
	for (let i=0; i<players.length; i++) {
	let amount = +document.querySelector(`.betArea${i+1}`).textContent;
	const cleanUpWhoBet = function() {
		setTimeout(() => {
		document.querySelector(`.whatBet${i+1}`).style.display = 'none';
	},2000);
	}

	if (document.querySelector(`.player${i+1}`).classList.contains('active')) {

	if (document.querySelector(`.player${i+1}`).classList.contains('folded')) {
		nextPlayer();
		break;
	}

	if (stack[i] ===0) {
		nextPlayer();
		bettors[i+1] = Math.max(...Object.values(bettors));
		betCount --;
		break;
	}
	// to create Stacks for All In
	const createStack = function(i,allInAmount) {
		const playerStack = document.createElement('div');
		playerStack.className = `player${i}Stack`;
		document.querySelector('.potHeading').appendChild(playerStack);

		playerStack.innerText = allInAmount;

	}

	// for raising
	
document.querySelector(`.player${i+1}`).querySelector('.raise').addEventListener('click', function () {
	amount += Number(this.children[0].textContent);

	// too calcuale raising / callinig
	const maxCall = Object.values(bettors).reduce((max,el) => {if (el > max) {
		max = el}
		return max},0);
	pot += amount; 
	stack[i] = stack[i] - amount;
	document.querySelector(`.active`).children[3].textContent = `${stack[i]}`;
	bettors[i+1] = amount;
	if (amount == maxCall) {
		document.querySelector(`.whatBet${i+1}`).textContent = 'Call';
		document.querySelector(`.whatBet${i+1}`).style.display = 'block';
	} else if (amount > maxCall) {
	document.querySelector(`.whatBet${i+1}`).textContent = 'Raise';
	document.querySelector(`.whatBet${i+1}`).style.display = 'block';
	if (stack[i] ===0) {
		document.querySelector(`.whatBet${i+1}`).textContent = 'All In';
	document.querySelector(`.whatBet${i+1}`).style.display = 'block';
	allIn[i+1] = amount;
	bettors[i+1] = Math.max(...Object.values(bettors));
	}
	} else if (amount ===0) {
		document.querySelector(`.whatBet${i+1}`).textContent = 'Check';
	document.querySelector(`.whatBet${i+1}`).style.display = 'block';
	}
	
	document.querySelector(`.potBox`).textContent = `${pot}`;
	
	document.querySelector(`.betArea${i+1}`).textContent = amount;
	betAmount.push(amount);
	cleanUpWhoBet();
	nextPlayer();
	betCount --;
	});
	// for checking/calling
	document.querySelector(`.player${i+1}`).querySelector('.check').addEventListener('click', function () {
		// this is to see if someone has to call
	if (document.querySelector(`.player${i+1}`).querySelector('.check').textContent.includes('Call') || document.querySelector(`.player${i+1}`).querySelector('.check').textContent.includes('All In')) { 
	amount += Number(this.children[0].textContent);
	pot += amount; 
	stack[i] = stack[i] - this.children[0].textContent;
	document.querySelector(`.active`).children[3].textContent = `${stack[i]}`;
	
	bettors[i+1] = amount;
	document.querySelector(`.potBox`).textContent = `${pot}`;
	if (stack[i] ===0) {
		document.querySelector(`.whatBet${i+1}`).textContent = 'All In';
	document.querySelector(`.whatBet${i+1}`).style.display = 'block';
	allIn[i+1] = amount;
	bettors[i+1] = Math.max(...Object.values(bettors));
	document.querySelector(`.betArea${i+1}`).textContent = amount;
	} else {document.querySelector(`.whatBet${i+1}`).textContent = 'Call';
	document.querySelector(`.whatBet${i+1}`).style.display = 'block';
	document.querySelector(`.betArea${i+1}`).textContent = amount;
	}
	betAmount.push(amount);
	cleanUpWhoBet();
	nextPlayer();
	betCount --;
	}
	else {
	// this is check
	document.querySelector(`.whatBet${i+1}`).textContent = 'Check';
	document.querySelector(`.whatBet${i+1}`).style.display = 'block';
	cleanUpWhoBet();
	nextPlayer();
	betCount --;
	bettors[i+1] = 0;

	}	 
	});
	// for folding
	document.querySelector(`.player${i+1}`).querySelector('.fold').addEventListener('click', function () {
	pot += 0; 
	document.querySelector(`.whatBet${i+1}`).textContent = 'Fold';
	document.querySelector(`.active`).children[3].textContent = `${stack[i]}`;
	delete bettors[i+1];

	// make this player inactive
	cleanUpWhoBet();
	document.querySelector(`.player${i+1}`).classList.add('folded');

	nextPlayer();
	betCount --;
	});

}
}




// organize All In
// this will tell me the max a person can win
for (let key in allIn) {
	let sum = 0;
	betAmount.forEach(el => {
		if (el <= allIn[key]) {
			sum += el;
		} 
		else if (el > allIn[key]) {
			sum += allIn[key];
		}
	});
	allInPot[key] = sum;

}

// 




if (Object.values(bettors).every((el,index,arr) => el === arr[0]) && betCount <= 0 && river && Object.values(bettors).length >1 && !winning) {
	const active = document.querySelector('.active');
	active.querySelectorAll('button, input').forEach(el => {
	active.removeChild(el);
	});
	if (Object.keys(allInPot).length >0) {
		const uniqueAllIns = [...new Set(Object.values(allInPot))];
		let min2 = 0;
		const allInInterval = setInterval(wait, 4000);
	function wait() {
		if (Object.keys(allInPot).length ===0) {
			clearInterval(allInInterval);
			if (bettors && pot !==0) {
				deck.winning(pot,stack);
				}
				newGame();
		} 

		else 
		{
		const min1 = Math.min(...Object.values(allInPot));
		pot -= (min1-min2);
		deck.winning((min1-min2),stack);
		for (let key in allInPot) {
			if (allInPot[key] === min1) {
				delete allInPot[key];
				delete bettors[key];
				
					}
				}
			min2 = min1;
			}
		}
			
			
		}

	else if (bettors && pot !==0 && Object.keys(allInPot).length ===0) {
		deck.winning(pot,stack);
		newGame();
	};

	winning = true;
	for (let i=0; i<players.length;i++) {
		document.querySelector(`.betArea${i+1}`).textContent = '';
	}
	

} 

if (Object.values(bettors).every((el,index,arr) => el === arr[0]) && betCount <= 0 && turn && Object.values(bettors).length >1 && !river) {

	deck.river();
	river = true;
	for (let i=0; i<players.length;i++) {
		document.querySelector(`.betArea${i+1}`).textContent = '';
	}
	betCount = Object.values(bettors).length;
		for (let bettor in bettors) {
			bettors[bettor] =0;
		}
		for (let i=0; i<bettors.length -allIn.length;i++) {
			nextPlayer();
		}



}

if (Object.values(bettors).every((el,index,arr) => el === arr[0]) && betCount <= 0 && flop && Object.values(bettors).length >1 && !turn) {

	deck.turn();
	turn = true;
	for (let i=0; i<players.length;i++) {
		document.querySelector(`.betArea${i+1}`).textContent = '';
	}
	betCount = Object.values(bettors).length;
		for (let bettor in bettors) {
			bettors[bettor] =0;
		}

		for (let i=0; i<bettors.length -allIn.length;i++) {
			nextPlayer(flop);
		}



}

if (Object.values(bettors).every((el,index,arr) => el === arr[0]) && betCount <= 1 && Object.values(bettors).length >1 && !flop) {
		deck.flop();
		flop = true;
		for (let i=0; i<players.length;i++) {
		document.querySelector(`.betArea${i+1}`).textContent = '';
	}
		betCount = Object.values(bettors).length;
		for (let bettor in bettors) {
			bettors[bettor] =0;
			
			// need to call next players so that calculations will reset
		}
		for (let i=0; i<bettors.length -allIn.length;i++) {
			nextPlayer();
		}
	}



	// to calculate winning bet

	if ((Object.keys(bettors).length ===1 && betCount <=2 && !winning && !flop) || Object.keys(bettors).length ===1 && betCount <=1 && !winning) {
		const winnerBet = Object.keys(bettors)[0];
		stack[winnerBet -1] += pot;
		for (let i=0; i<players.length;i++) {
		document.querySelector(`.betArea${i+1}`).textContent = '';
			}
		pot = 0;
		document.querySelector(`.potBox`).textContent = `${pot}`;
		document.querySelector(`.player${winnerBet}`).querySelector('.stackBox').textContent = stack[winnerBet-1];
		const active = document.querySelector('.active');
		active.querySelectorAll('button, input').forEach((el) => {
		active.removeChild(el);
			});
		deck.showCard(winnerBet);
		winning = true;

		newGame();
	}

	// this will just make sure that after flops people can still riase(had a bug that wouldn't account for that)
	if (!winning) {
	const currentPlayer = document.querySelector('.active').className.substring(6,7)-1;
	if (stack[currentPlayer] > Math.max(... Object.values(bettors))) {
	document.querySelector(`.player${currentPlayer+1}`).querySelector('.raise').style.display = 'inline-block';
	document.querySelector(`.player${currentPlayer+1}`).querySelector('.raise').disabled = false;
		}
	}





}

bet();


// promises
