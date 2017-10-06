//Current slide variable
var slideIndex = 0;
var reTimeout;
//Set default for the first slide
showSlide(slideIndex);

function showSlide(n) {
	var i;
	var slide = document.getElementsByClassName("current-image");
	var listImage = document.getElementsByClassName("image");
	//slideIndex : 0~3; slide.length : 1~4
	//Move from the last slide to the first
	if (n >= slide.length) {
		slideIndex = 0;
	}
	//Move from the first slide to the last
	if (n < 0) {
		slideIndex = slide.length - 1;
	}
	for (i = 0; i < slide.length; i++) {
		slide[i].style.display = "none";
	}
	for (i = 0; i < listImage.length; i++) {
		listImage[i].className = listImage[i].className.replace(" active", ""); 
	}
	//Change display's value of style attribute from "none" to "block"
	slide[slideIndex].style.display = "block";
	//Border current image with class "active"
	listImage[slideIndex].className += " active";
	/*
	clearTimeout(reTimeout);
	//Time (3s) move to next slide
	reTimeout = setTimeout(function () {
		showSlide(slideIndex +=1);
	}, 3000);
	*/
}
//Choose image to see on the slide
function currentSlide(n) {
	showSlide(slideIndex = n);
}
//Click on Previous image (<) or Next image (>)
function adjacentImg(n) {
	showSlide(slideIndex += n);
}