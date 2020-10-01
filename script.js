$(document).ready(() => {
	let isOperator = /[\/\*\-\+]/gi; 	// check if the input is an operator
	let isNumber = /[\d]/gi;			// check if the input is a number
	let totalStr;						// the value being displayed after calculation
	let inputs = [];					// array that contains the equation. each element is either number or operator
	$("button").click((event) => {
		let btn = $(event.target).text();
		switch(btn) { //do not need to add {} in each case
			case "AC": 
				inputs = [];
				update();
				break;
			
			case "CE": 
				inputs.pop();
				update();
				break;
			
			case "=": 
				getTotal();
				break;
			
			default: 
				getVal(btn);
				update();
				break;
			
		}
	})
	
	// update the value being displayed.
	function update() {
		totalStr = inputs.length == 0 ? "0" : inputs.join("");
		$("#result").html(totalStr);
	}
	
	// calculate the equation
	function getTotal() {
		totalStr = inputs.join("");
		// inputs = [totalStr];
		$("#result").html(eval(totalStr));
	}
	
	function getVal(val) {
		// if a number was pressed.
		// if operator was pressed.
		// if '.' was pressed.
		
		if(isNumber.test(val)) {
			inputs.push(val);
		}
		else if(isOperator.test(val)) {
			// check if operator is already present
			if(!inputs[inputs.length - 1].match(isOperator)) {
				inputs.push(val);
			}
            else {
                inputs.pop();
                inputs.push(val);
            }
		}
		else {
			//join the equation
			//split them by isOperator regex
			//check if the last element has a '.'
			let temp = inputs.join("");
			temp = temp.split(isOperator);
			if(temp.length && !temp[temp.length - 1].includes(".")) {
				inputs.push(val);
			}
		}
	}
})
