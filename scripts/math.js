/*
return sum of all elements of a 2D symmetric matrix
*/

function TwoDMatrixSum(m){
	var s = 0;
	for (var i = 0;  i < m.length; i++) {
		for (var j = 0; j < m.length; j++) {
			s+=m[i][j];
		};
	};
	
	/* only for WIKI because USE has additional 1 in first column */
	/* adjust for each model: model complexity constraint */
	 
	s = s - 0;

	console.log("Sum IRG values: " + s);
	
	return(s);
}

/* 
Sort a list and return r-th element
*/

function SelectRankElement(m,r){
	var l = [];
	var s = [];

	for (var i = 0;  i < m.length; i++) {
		for (var j = 0; j < m.length; j++) {
			l.push(m[i][j]);
		};
		s = l.sort(function(a, b){return b-a});
	};

	s.forEach(function(e){console.log("IRG: " + e)});
	
	console.log("Value of the " + (r-1) + "-th element : " + s[r-1]);

	return(s[r-1]);
}

function exogenousVars(m){
	var exovars = [];
	var count = 0;
	var ob = {};

	for (var i = 0; i < m.length; i++) {
		count = 0;
		for (var j = 0; j < m.length; j++){
			ob = m[j][i];
//			console.log("irg[" + j + "][" + i + "] = " + m[j][i]);

			if ((typeof m[j][i] == "number") && (m[j][i] !== -1)){
				count++;
			};
		};

		if(count === 0){
			exovars.push(i);
			console.log("Exogenous variable: " + i);	
		} else{
			console.log("Endogenous variable: " + i );
		}
	};

	return(exovars);
}

function getPath(v, m, parents){
	var targets = [];
	var end = [];
	var th = [];

	for (var i = 0; i < m.length; i++) {
		if ((typeof m[v][i] == "number") && (m[v][i] !== -1)){
			targets.push(i);
		};
	};

	parents.push(v);
	for (var j = 0; j < targets.length; j++) {
		th.push(getPath(targets[j], m, parents));
	};

	if (targets.length == 0){
		end.push(parents);
		end.push("*");
		th.push(end);
		console.log("Thread at the end: th: " + th + " parents: " + parents);
		parents.pop();
		return(th);
	}else{
		parents.pop();
		return(th);
	}
};