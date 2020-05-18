'use strict';

let shoppingCart = document.querySelector('#cart');
let courseList = document.querySelector('#course-list');
let localCourses = document.querySelector('#cart-list tbody');
let resetCourses = document.querySelector('#empty-cart');

let idArr=[];

function addCourse(event){
    
    if(event.target.classList.contains("agregar-carrito")){
        let chosenCourse = event.target.parentElement.parentElement;
        readCourse(chosenCourse);
    }
}

function readCourse(chosenCourse){
    let LScourses;
    LScourses = getFromLocal();
    
    const courseCard = {
        image: chosenCourse.querySelector('img').src,
        title: chosenCourse.querySelector('h4').innerText,
        price: chosenCourse.querySelector('.price span').innerText,
        id: chosenCourse.querySelector('a').getAttribute('data-id')
    }
    
    if(LScourses.map(obj => obj.id).indexOf(courseCard.id) === -1){
        renderInCart(courseCard);
    }else{
        alert('Este curso ya está en el carrito')
    }
    
}

function renderInCart(courseCard){
    const row = document.createElement('tr');
    row.innerHTML = `<td><img src="${courseCard.image}" width=100></td>
    <td>${courseCard.title}</td>
    <td>${courseCard.price}</td>
    <td><a href=# class="delete-course" data-id=${courseCard.id}>X</a></td>`;
    localCourses.appendChild(row);
    shoppingCart.addEventListener('click', deleteCourse);
    setInLocal(courseCard);
}

function deleteCourse(event){
    let course;
    let courseId;
    if(event.target.classList.contains("delete-course")){
        event.target.parentElement.parentElement.remove();
        course = event.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
        
    }
    deleteFromLocal(courseId);
}

function deleteFromLocal(courseId){
    let coursesLS;
    coursesLS = getFromLocal();
    coursesLS.forEach(function(course, index){
        if(course.id === courseId){
            coursesLS.splice(index, 1);
        }
    })
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

function resetAllCourses(){
    
    while(localCourses.firstChild){
        localCourses.removeChild(localCourses.firstChild);
    }
    emptyLocal();
    
    return false;
}

function emptyLocal(){
    localStorage.clear();
}

function setInLocal(courseCard){
    let courses;
    courses = getFromLocal();
    courses.push(courseCard);
    localStorage.setItem('courses', JSON.stringify(courses));
    
}

function getFromLocal(){
    let coursesLS;
    if(localStorage.getItem('courses') === null){
        coursesLS = [];
    }else{
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }
    return coursesLS;
}

function readLocal(){
    let coursesLS;
    coursesLS = getFromLocal();
    coursesLS.forEach(function(courseCard){
        const row = document.createElement('tr');
        row.innerHTML = `<td><img src="${courseCard.image}" width=100></td>
        <td>${courseCard.title}</td>
        <td>${courseCard.price}</td>
        <td><a href=# class="delete-course" data-id=${courseCard.id}>X</a></td>`;
        localCourses.appendChild(row);
        shoppingCart.addEventListener('click', deleteCourse);
    })
}


window.addEventListener('load', readLocal)
resetCourses.addEventListener('click', resetAllCourses);
courseList.addEventListener('click', addCourse);