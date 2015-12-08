var div = document.getElementById("outputColour");
var inputTempBox = document.getElementById("inputTemp");
var getTempButton = document.getElementById("submitTemp");

var unitButtons = document.getElementsByName("unit");

var outputWavelength = document.getElementById("outputWavelength");
var outputDiv = document.getElementById("outputColour");



getTempButton.addEventListener("click", function(){
	var unit = getUnit();
	var temp = getTemp(unit);

	if (temp !== false) {
		var colour = convertToColour(temp, unit);
		updateDiv(colour.red, colour.green, colour.blue, colour.alpha, colour.spectrum);
	}
	else {
		alert("please choose your units");
	}
	
})

var hc_xk = 2.89776829 * Math.pow(10, -3); // [meters*kelvin]

var getUnit = function() {
	for (var i = 0; i < unitButtons.length; i++) {
		if (unitButtons[i].checked) {
			return unitButtons[i].value;
		}
	}
	
};

var getTemp = function(units) {
	var inputTemp = inputTempBox.value;
	if (units === "KELVIN" && inputTemp < 0) {
		alert("Cannot have negative value in Kelvin");
		return false;
	}
	else {
		if (units === "CELSIUS" && inputTemp < -273.15) {
			alert("Cannot have a temperature less than absolute zero [-273.15 Celsius]");
			return false;
		}
		else if (units === "CELSIUS" && inputTemp >= -273.15) {
			return (inputTemp + 273.15); //convert to kelvin
		}
		else if (units === "KELVIN") {
			return inputTemp;
		}
		else {
			return false;
		}
	}


};



var convertToColour = function(temperature) {
	var redCol = 0;
	var greenCol = 0;
	var blueCol = 0;

	var alphaNum = 1;
	// Wiens displacement law
	var lambda_max = hc_xk/temperature; // [meters]
	var wavelength = (lambda_max * Math.pow(10,9));
	
	outputWavelength.innerHTML = wavelength + " nm";
	wavelength = Math.round(wavelength);
	

	if (wavelength < 380) {
		redCol = 255;
		greenCol = 255;
		blueCol = 255;
		spectrum = "UV or greater";
		
		
	}
	else if (wavelength > 780) {
		redCol = 255;
		greenCol = 255;
		blueCol = 255;
		spectrum = "IR or less";
		
		
	}
	else {
		
		spectrum = "Visible";
		var colours = getRGB(wavelength)
		redCol = colours.red;
		greenCol = colours.green;
		blueCol = colours.blue;
		alphaNum = colours.alpha;
	}

	return {
		red: redCol,
		green: greenCol,
		blue: blueCol,
		alpha: alphaNum,
		spectrum: spectrum
	}
}

var updateDiv = function(red, green, blue, alpha, spectrum) {
	console.log(red);
	console.log(green);
	console.log(blue);
	outputDiv.style.backgroundColor = "rgba(" + Math.round(red) +", " + Math.round(green) +", " + Math.round(blue) +", " + alpha + ")";

	if (containsSubstring(spectrum, "UV") || containsSubstring(spectrum, "IR")) {
		outputDiv.innerHTML = spectrum;
		
	}
	else {
		outputDiv.innerHTML = "";
	}

};

var containsSubstring = function(string, substring) {
	
	return (string.indexOf(substring) !== -1);
}

// Adapted into Javascript from:
// http://www.efg2.com/Lab/ScienceAndEngineering/Spectra.htm
var getRGB = function (wavelength) {
	
  
  if (wavelength >= 380 && wavelength <= 439) {
  	console.log("380 439");
    red   = -(wavelength - 440) / (440 - 380);
    green = 0.0;
    blue = 1.0;

  }
  else if (wavelength >= 440 && wavelength <= 489){

    red   = 0.0;
    green = (wavelength - 440) / (490 - 440);
    blue  = 1.0;
  }
  else if(wavelength >= 490 && wavelength <= 509){

  	
    red   = 0.0;
    green = 1.0;
    blue  = -(wavelength - 510) / (510 - 490);

  }

  else if (wavelength >= 510 && wavelength <= 579){

  	
    red   = (wavelength - 510) / (580 - 510);
    green = 1.0;
    blue  = 0.0

  }
  else if (wavelength >= 580 && wavelength <= 644) {

  	
    red   = 1.0;
    green = -(wavelength - 645) / (645 - 580);
    blue  = 0.0

  }
  else if (wavelength >= 645 && wavelength <= 780) {   
  	
    red   = 1.0;
    green = 0.0;
    blue  = 0.0

  }
  else {
  	
    red   = 0.0;
    green = 0.0;
    blue  = 0.0
  }

  // Let the intensity fall off near the vision limits
  if (wavelength >= 380 && wavelength <= 419) {
    factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
  }
  else if (wavelength >= 420 && wavelength <= 700) {
    factor = 1.0;
  }
  else if (wavelength >= 701 && wavelength <= 780) {
    factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700)
  }
  else {
    factor = 0.0
  }
  red *=  255;
  green *= 255;
  blue *= 255;

  console.log(red + " " + green + " " + " " + blue);
  return {
  	red: red,
  	green: green,
  	blue: blue,
  	alpha: factor
  }
};