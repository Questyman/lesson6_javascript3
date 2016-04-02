/*    
    Program Name:  PhotoCarousel
    Author: Michael Gunter
    Date: 3/23/2016
    Filename: photos.js
    Copyright 2016

    This file is part of PhotoCarousel.
    PhotoCarousel is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    PhotoCarousel is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
    You should have received a copy of the GNU General Public License along with PhotoCarousel. If not, see http://www.gnu.org/licenses/.
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5];
var figureCount = 3;

/* declare populateFigures() function and corresponding vairables*/
function populateFigures(){
   var filename;
   var currentFig;
   
   if (figureCount === 3){
      for (var i = 1; i < 4; i++) {
         filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
         currentFig = document.getElementsByTagName("img")[i - 1];
         currentFig.src = filename;
      }//end of for loop
   } else {
      for (var i = 0; i < 5; i++) {
      filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
      currentFig = document.getElementsByTagName("img")[i];
      currentFig.src = filename;
      }//end of for loop
   }// end of else
   
}//end of populateFigures()




/* shift all images one figure to the right, and change values in photoOrder array to match  */
function rightArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
      populateFigures();
   }//end of for loop
}//end of rightArrow Function





/* shift all images one figure to the left, and change values in photoOrder array to match  */
function leftArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5;
      } else {
         photoOrder[i] -= 1;
      }
      populateFigures();
   }//end of for loop
}//end of leftArrow Function

/* previews five images in the image gallery rather than three */
function previewFive(){
   
   var articleEl = document.getElementsByTagName("article")[0];

   //create figure and img elements for fifth image
   var lastFigure = document.createElement("figure");
   lastFigure.id = "fig5";
   lastFigure.style.zIndex = "5";
   lastFigure.style.position = "absolute";
   lastFigure.style.right = "45px";
   lastFigure.style.top = "67px";
   
   var lastImage = document.createElement("img");
   lastImage.width = "240";
   lastImage.height = "135";
   
   lastFigure.appendChild(lastImage);
   
   articleEl.appendChild(lastFigure);
   
   //clone figure element for fifth image and edit to be first image
   var firstFigure = lastFigure.cloneNode(true);
   
   firstFigure.id = "fig1";
   firstFigure.style.right = " ";
   firstFigure.style.left = "45px";
   
   articleEl.insertBefore(firstFigure, document.getElementById("fig2"));
   
   // add appropriate src values to two new img elements
   document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
   document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";
   
   figureCount = 5;
}//end of previewFive()


// create event listeners for left arrow, right arrow, and center figure element
function createEventListeners(){
   var leftarrow = document.getElementById("leftarrow");
   if (leftarrow.addEventListener) {
      leftarrow.addEventListener("click", leftArrow, false);
   } else if (leftarrow.attachEvent) {
      leftarrow.attachEvent("onclick", leftArrow);
   }//end of else if
    var rightarrow = document.getElementById("rightarrow");
   if (rightarrow.addEventListener) {
      rightarrow.addEventListener("click", rightArrow, false);
   } else if (rightarrow.attachEvent) {
      rightarrow.attachEvent("onclick", rightArrow);
   }//end of else if
   
   var showAllButton = document.querySelector("#fiveButton p");
   if (showAllButton.addEventListener) {
      showAllButton.addEventListener("click", previewFive, false);
   } else if (showAllButton.attachEvent) {
      showAllButton.attachEvent("onclick", previewFive);
   }//end of else if
}//end of createEventListeners function


/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   populateFigures();
}//end of setUpPage Function


/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}
