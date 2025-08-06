const courseName= document.getElementById('coursename');
const creditHours=document.getElementById('credits');
const courseGrade= document.getElementById('grade');
const addCourseBTN=document.getElementById('addcourse');
const calcGPABTN=document.getElementById('calculategpa');
const resetBTN= document.getElementById('reset');
const gpaRes= document.getElementById('urgpa');
const courseListDiv= document.getElementById('courselist');

const courses= [];
const gradeConvert= {
    'A+': 0.7,
    'A': 1,
    'A-': 1.3,
    'B+': 1.7,
    'B': 2,
    'B-':2.3,
    'C+':2.7,
    'C':3,
    'C-':3.3,
    'D+':3.7,
    'D':4,
    'F':5
};

function addCourse(){
    const name= courseName.value.trim();
    const credits= parseFloat(creditHours.value);
    const grade= courseGrade.value;

    if(credits<=0||!grade||isNaN(credits))
        {alert('Insert Right Data!');
        return;}

    const course={
     name: name|| `Course ${courses.length + 1}`,
     credits: credits,
     grade: grade
    };

    courses.push(course);
    displayCourses();
    clearInput();
}

function displayCourses(){
    courseListDiv.innerHTML = '';

    courses.forEach((course,index) =>{
        const courseItem= document.createElement('div');
        courseItem.className= "flex item-center justify-between gap-2 p-3 rounded-md ";
        courseItem.innerHTML=`
        <span>${course.name}</span>
        <span class="terxt-sm">${course.credits} Credits - Grade: ${course.grade}</span>
        <button data-index="${index}" class="removebtn hover:text-red-500">X</button>
        `;
    courseListDiv.appendChild(courseItem);

    });

    document.querySelectorAll('.removebtn').forEach(button => {
        button.addEventListener('click',remItem );
    });
    
}

function remItem(event){
    const ind= parseInt(event.target.dataset.index);
    courses.splice(ind, 1);
    displayCourses();
    calculateGPA();
}

function clearInput(){
    courseName.value='';
    creditHours.value='';
    courseGrade.value='';
    }


function calculateGPA(){
    let weight=0;
    let creds=0;

    if (courses.length===0){
        gpaRes.textContent= 'N/A';
        return;}

    for(const course of courses){
        const numerics= gradeConvert[course.grade];
        creds+=course.credits;
        weight+= course.credits*numerics;

    }
    gpaRes.textContent=(weight/creds).toFixed(2);


}

function resetList(){
    courses.length=0;
    clearInput();
    displayCourses();
    gpaRes.textContent= 'N/A';
    


}

function updateGPA(){

}

addCourseBTN.addEventListener('click',addCourse);
calcGPABTN.addEventListener('click',calculateGPA);
resetBTN.addEventListener('click',resetList);

displayCourses();