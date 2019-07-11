var ht = document.documentElement; //documentElement is the HTML canvas
var blogBut = document.getElementById("blogHug");
var devBut = document.getElementById("devHug");
var taxBut = document.getElementById("taxHug");
var aboutBut = document.getElementById("aboutHug");
var taxAppsBut = document.getElementById("taxAppHug");
var taxArtBut = document.getElementById("taxArtHug");
var col1 = document.getElementById("col1");
var col2 = document.getElementById("col2");
var col3 = document.getElementById("col3");
var hBut1 = document.getElementById("homeBut1");
var hBut2 = document.getElementById("homeBut2");
var hBut3 = document.getElementById("homeBut3");


// ID.EVENT = function call
// script injection has to be at the end of html
// taxHug.onmouseover = taxHug.onmouseout = taxIt;
// blogHug.onmouseover = blogHug.onmouseout = blogIt;
// aboutHug.onmouseover = aboutHug.onmouseout = aboutIt;
// devHug.onmouseover = devHug.onmouseout = devIt;

//Onclick calls
taxHug.onclick = taxIt;
blogHug.onclick = blogIt;
aboutHug.onclick = aboutIt;
devHug.onclick = devIt;
homeBut1.onclick = resetIt;
homeBut2.onclick = resetIt;
homeBut3.onclick = resetIt;


function taxIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'click') {
        ht.className='taxRound';
        
        blogHug.className='hideMe';
        devBut.className='hideMe';
        aboutBut.className='hideMe';

        col1.className="hideMe";
        col2.className="hideMe";
        col3.className="reOrg";
        
        taxBut.className='hideMe';
        taxAppsBut.className='customBut';
        taxArtBut.className='customBut';
        hBut3.className='backLink';
    }
    else if (event.type == 'mouseover') {
        ht.className='taxRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}

function blogIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'click') {
        ht.className='blogRound';
        taxHug.className='hideMe';
        devBut.className='hideMe';
        aboutBut.className='hideMe';

        col1.className="hideMe";
        col2.className="reOrg";
        col3.className="hideMe";

        hBut2.className='backLink';
    }
    else if (event.type == 'mouseover') {
        ht.className='blogRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}

function aboutIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'click') {
        ht.className='aboutRound';
    }
    else if (event.type == 'mouseover') {
        ht.className='aboutRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}

function devIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'click') {
        ht.className='devRound';
    }
    else if (event.type == 'mouseover') {
        ht.className='devRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}

function resetIt () {

    ht.className='';
    blogBut.className="customBut";
    taxBut.className='customBut';
    devBut.className='customBut';
    aboutBut.className='customBut';

    col1.className="leftCol";
    col2.className="midCol";
    col3.className="rightCol";

    hBut1.className="hideMe";
    hBut2.className="hideMe";
    hBut3.className="hideMe";

    taxAppsBut.className='hideMe';
    taxArtBut.className='hideMe';
   
}