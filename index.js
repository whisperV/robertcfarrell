

const   aboutButton = document.getElementById('about'),
        blogButton = document.getElementById('blog'),
        readButton = document.getElementById('articles'),
        allButtons = document.getElementsByClassName('navbuttons');

const blogIt = () => {  
    window.location = 'https://blogbert.herokuapp.com/'  
    blogButton.innerText = 'Loading';
    blogButton.className += " spinner-grow";
    // setTimeout(()=> {
    //     blogButton.innerText = 'Blog';
    //     blogButton.className = "navbuttons navimation";
    // }, 5000)                      
}

const aboutIt = () => {
    window.location.pathname = '/about.html'  
    aboutButton.innerText = 'Loading';
    aboutButton.className += " spinner-grow";
    setTimeout(()=> {
        aboutButton.innerText = 'Blog';
        aboutButton.className = "navbuttons navimation";
    }, 5000)           
}

const devIt = (event) => {
    window.location.pathname = '/apps.html';
    // var cX = event.clientX;
    // var sX = event.screenX;
    // var cY = event.clientY;
    // var sY = event.screenY;
    // var coords1 = "client - X: " + cX + ", Y coords: " + cY;
    // var coords2 = "screen - X: " + sX + ", Y coords: " + sY;
    // document.getElementById("cursorloc").innerHTML = coords1 + "<br>" + coords2;
}

const readIt = () => {
    readButton.innerText = 'Loading';
    readButton.className += " spinner-grow";    
    setTimeout(()=> {
        readButton.innerText = 'Read';
        readButton.className = "navbuttons navimation";
    }, 5000)             
}

const simpleEstimate = () => {
    window.location='Src/TaxApps/TaxCalc/SimpleTaxEstimator.html'
    
}
const iraCalc = () => {
    window.location='Src/TaxApps/RetireContribs/RetirementContributions.html'
}

const buttonResponse = () => {     
    // for(button of allButtons){
    //     if(button.classList.contains('wavy')){
    //         button.classList.remove('wavy')
    //         button.classList.add('gravy')       
    //     } else {
    //         button.classList.add('wavy')
    //         button.classList.remove('gravy')
    //     }
        
    // }      
}

$(document).ready(function() {
        $('.nav-container').ripples({
            resolution: 512,
            dropRadius: 10,
            perturbance: 0.02,
        });
});

// Add a 'drop' to the ripples
// $('body').ripples("drop", x, y, radius, strength)