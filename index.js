// CHANGE TO CONSTS

// CREATE NAMESPACE?

const ht = document.documentElement; //documentElement is the HTML canvas
const bod = document.getElementsByTagName("body");
const blogBut = document.getElementById("blogHug");
const devBut = document.getElementById("devHug");
const taxBut = document.getElementById("taxHug");
const aboutBut = document.getElementById("aboutHug");
const taxAppsBut = document.getElementById("taxAppHug");
const taxArtBut = document.getElementById("taxArtHug");
const col1 = document.getElementById("col1");
const col2 = document.getElementById("col2");
const col3 = document.getElementById("col3");
const hBut1 = document.getElementById("homeBut1");
const hBut2 = document.getElementById("homeBut2");
const hBut3 = document.getElementById("homeBut3");
const hBut4 = document.getElementById("homeBut4");
const mDiv = document.getElementById("mainDiv");
const secDiv = document.getElementById("secondDiv");
const artist = document.getElementById("imageCredit");
const loader = document.getElementById("loadIt");
const devButText = document.getElementById("devLoad");

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
homeBut4.onclick = resetIt;


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

        devButText.className="";
        loader.className="hideMe";

        artist.innerHTML='Photo by Kelly Sikkema on Unsplash';
        
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
        col2.className="reOrg devOrg";
        col3.className="hideMe";

        devButText.className="";
        loader.className="hideMe";

        hBut2.className='backLink';

        artist.innerHTML='Photo by Alejandro Benėt on Unsplash';
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
        mDiv.className='hideMe';
        secDiv.className='';

        devButText.className="";
        loader.className="hideMe";

        artist.innerHTML='Photo by Joss Woodhead on Unsplash';
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

        loader.className="";
        devButText.className="hideMe";

        artist.innerHTML='Photo by Wilmer Martinez on Unsplash';
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

    secDiv.className='hideMe';
    mDiv.className='centeredSubEle';

    devButText.className="";
    loader.className="hideMe";

    artist.innerHTML='Marc-Olivier Jodoin on Unsplash';
   
}

// function showLoader(){
//     loader.className='hideMe';
//     devButText.className=''
// }