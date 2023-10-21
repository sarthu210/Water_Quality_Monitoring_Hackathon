let menu = document .querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
 menu.classList.toggle('fa-times');
 navbar.classList.toggle('active');
}

/* Rotating Text - Word Cycle */
let title = document.querySelector('.main_heading');
let name = "Photograper"
let index = 1;

const typeWriter = () => {
    let new_title = name.slice(0,index);
    title.innerText = new_title;

    index > name.length ? index = 1 : index++;
    // index++;

    setTimeout(() => typeWriter(), 350)
}

typeWriter();

