// CHANGE TO CONSTS

// CREATE NAMESPACE?

const   mDiv = document.getElementById("mainDiv"),
        secDiv = document.getElementById("secondDiv"),
        dLoader = document.getElementById("loadItD"),
        bLoader = document.getElementById("loadItB"),
        devButText = document.getElementById("devLoad"),
        blogButText = document.getElementById('blogLoad');

function blogIt(){  
        devButText.className="";
        dLoader.className="hideMe";
        blogButText.className="hideMe";
        bLoader.className=""; 
}

function aboutIt(){
        mDiv.className='hideMe';
        secDiv.className='';

        devButText.className="";
        dLoader.className="hideMe";
        blogButText.className="";
        bLoader.className="hideMe";    
}

function devIt(){
    dLoader.className="";
    devButText.className="hideMe";
    blogButText.className="";
    bLoader.className="hideMe";
}

