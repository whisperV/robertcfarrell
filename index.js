var ht = document.documentElement; //documentElement is the HTML canvas

// ID.EVENT = function call
// script injection has to be at the end of html
taxHug.onmouseover = taxHug.onmouseout = taxIt;
blogHug.onmouseover = blogHug.onmouseout = blogIt;
aboutHug.onmouseover = aboutHug.onmouseout = aboutIt;
devHug.onmouseover = devHug.onmouseout = devIt;


function taxIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'mouseover') {
        ht.className='taxRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}

function blogIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'mouseover') {
        ht.className='blogRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}

function aboutIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'mouseover') {
        ht.className='aboutRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}

function devIt(event){
    //mouseover on *Hug button appends a class to the HTML element
    if (event.type == 'mouseover') {
        ht.className='devRound';
    }
    if (event.type == 'mouseout') {
        ht.className ='';
    }

}
