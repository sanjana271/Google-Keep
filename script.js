//learn about DOM
//insted of writting document.getElementById we will write
//to get button work
const addButton = document.querySelector('#add'); //id of button i.e. reference to chnage or operate

//define local storage data
const  updateLSData = () =>{
    //for updating it we will use queryselector all cause thre can be multiple notes.
   const textarea=  document.querySelectorAll('textarea');//and the data will be stored in form of array.
   const notes = [];
   console.log(textarea);
   //now whatever user has written in text area , one by one we have to add into this empty array as individual array.
   //it takes 4 arguments-(1.currentvalue or currentelement ,2.index no of current element, 3.array with which ur working, 4.this argument)
   textarea.forEach((note) =>{//note is 1st text area and we will return it in a empty array which is notes.
        return notes.push(note.value);//now we have to add data in notes.
        //it will give nodelist for each textarea inside a array.
   });

   //to add it into local storage:
   //to add data in local we use setItem and to get data from local storage we use getItem and there is also a removeItem.
   localStorage.setItem('notes' , JSON.stringify(notes) );//now set keys notes here and 2nd one is string but in this we have a array so to store a array we use jason format. 
   //so now it will be stored in local storage.

};



//now we add html content in this 
//and for that we have to pass paramater called text
//with this text parameter we will know if we want to write or dont want to write
//i.e. i have complete writting my note and i want to save it now.
const addNewNote = (text = ' ') => {
    //now we have to create content dynamically with help of js
    //so create a div and add class note as in html
    //learn basics of js to create and add.
    const note = document.createElement('div');
    note.classList.add('note');
    //so here we created  <div class="note"> this part now we have to do same for other parts
    //and we can do this by using template literals

    //so now we can copy all data html int this.
    const htmlData = `  
   
<div class="operation">
   <button class="edit"><i class="fas fa-edit"></i></button>
   <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<!--for creating a edit and delete button inside a box-->
 
<!--to add text-->
<div class="main ${text ? "" : "hidden"} "> </div><!-if there is no text then hide main part so that we can write in text part->
<textarea class="${text ? "hidden" : ""}"></textarea><!--if note there is text already then hide the text part which means you cant add new text i.e. to save it already--->
<!--to write-->   
`;

//now we have to add data inside a div class
//and new method to add data is insertAdjecentElement ot insertAdjucentHtml
//insted of innerText innerHtml we can use these methods as its fast and new.

//here we are inserting html part into note.
//it took 2 arguments 1:where to insert position and 2:html data
//learn where to add https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
note.insertAdjacentHTML('afterbegin', htmlData);

//getting the references ie. for edit and delete icon to work i.e. all 4 reference from operation class
//edit delete main textarea
const editButton = note.querySelector('.edit'); //as everything is note query only
const delButton = note.querySelector('.delete');
const mainDiv = note.querySelector('.main');
const textarea = note.querySelector('textarea');//no need to add . as its not class or id.

//now for deleting:
delButton.addEventListener('click',() => {
    note.remove();
    updateLSData();//to delete it from local storage also i.e it will update it into a local storage.
});

//toggle using edit button.
textarea.value = text;
mainDiv.innerHTML = text;

//toggle using edit button.
//toggle like save or edit note
//in css we have hidden class at display none
//toggle can be either saved i.e. main part or textarea which is we are still writting
// we need only at a time and thats why we use hidden class , which means if we are using one thing other will be hidden
//so thats why we will use ternary operator in main and text. = ${}.
editButton.addEventListener('click',() => {
    mainDiv.classList.toggle('hidden');//it is to check if class is hidden or not if its hidden then unhide it and vice versa- meaning of toggle.
    textarea.classList.toggle('hidden');//so toggle will work but whenever we did hide text area our whole text also gone so wwe want the text to be remain there if we toggle.that it should be visisble to main div even after we toggle the text area.
});

//we can use input here but change/onchange is better option.
//if we input here then it will print text word by word in console so its better we use change event.
//it will what is happening at each event.
//event object is parent object of every event like event.target etc.
//which gives through which button event starts , its value, data etc. 
textarea.addEventListener('change', (event) =>{
   //here we want what user write in text area.
   const value = event.target.value;
   mainDiv.innerHTML = value;//copying a value.

   //to store it locally use update local storage data function
   //so we have to define it 1st:
   updateLSData();
});


//to add this as child in body:
//it appends a node as the last child of a node i.e. after and prepend means before.
document.body.appendChild(note); 
};


//now to get the data we save in our local system.
//our data is in string and our data was in array so use JSON.parse() to get data in original form.
const notes = JSON.parse(localStorage.getItem('notes'));
//so if data is present in notes then call addNewNote
if(notes){notes.forEach((note) => addNewNote(note))};//like if data is present already in notes then notes will be appear even after you refresh but we didint get a data inside so for that we have copy and paste the old data.
//thats why we add note in a argument to get a old data.
//so even after you refresh data will be there only.



//make it at bottom of js
//so whenever someone will click on Add new button we have to create a event and function to create a new note
//learn about events
//so we created a function called addNewNode and we have to define it and call it.
addButton.addEventListener('click', () =>  addNewNote() );



//what is local storage: 
//it means adding of data to local syatem. so when you close the browser or refresh tab then also data will be stored at your local storage.
//then you can fetch it from there and show here again.
//so in this we want to store at local system whatever we are writting in text area.
//so we have to work on textarea only.