import { Coworker } from "./coworker";

`<select class="js-example-basic-single" name="Timeline option" id=${theInterval.id + "C1"} >
    <option value="All" `+(theInterval.iInterval=='All'?'selected':'')+`>All</option>
    <option value="Weekend" `+(theInterval.iInterval=='Weekend'?'selected':'')+`>Saturday-Sunday</option>
    <option value="Mon" `+(theInterval.iInterval=='Mon'?'selected':'')+`>Monday</option>
    <option value="Tue" `+(theInterval.iInterval=='Tue'?'selected':'')+`>Tuesday</option>
    <option value="Wed" `+(theInterval.iInterval=='Wed'?'selected':'')+`>Wednesday</option>
    <option value="Thu" `+(theInterval.iInterval=='Thu'?'selected':'')+`>Thursday</option>
    <option value="Fri" `+(theInterval.iInterval=='Fri'?'selected':'')+`>Friday</option>
</select>`

function fillSelector(anyArray, AnyObject) {
    anyArray = [];
    const anyObject = new AnyObject();
    const anyObjects = anyObject.findAllItems();
    anyObjects.forEach(element => {
        anyArray.push({
            id: element.id,
            text: element.firstname + " " + element.surname
        });
    })
}

function renderSelector(anyArray) {
    anyArray.forEach(element => {
        let myOption = element.id + " " + element.text;
        const theOption = document.createElement('option');
        theOption.innerHTML = `<option id='O'+${element.id} >
                                ${myOption}  
                              </option>`
    
        inSelect.appendChild(theOption);
    });
}

const selectCoworker = document.getElementById('theForm');

theForm.innerHTML = `<h2>Baja de colaborador</h2>
                    <select id="selector">
                    </select>`

const inSelect = document.getElementById('selector');

data.forEach(element => {
    let myOption = element.id + " " + element.text;
    console.log(myOption);
    const theOption = document.createElement('option');
    theOption.innerHTML = `<option>
                            ${myOption}  
                          </option>`

    inSelect.appendChild(theOption);
});

const theButton = document.createElement('div')
theButton.innerHTML = `<p id="isAssigned" class="isRed"><p>
                        <button type="submit" id="boton" class="btn btn-oval btn-primary">
                            Enviar
                        </button>
                       </div>`

selectCoworker.appendChild(theButton)

selectCoworker.addEventListener('submit', () => {

    const idCoworker = document.getElementById('selector');

    const theId = idCoworker.value.substr(0, 4);

    const myTasks = task.findAllItems();

    let coworkerAssigned = false;

    for (element of myTasks) {
        if (theId == element.assignedTo) {
            coworkerAssigned = true;
        }
    }

    if (coworkerAssigned) {

        let theComment = "El colaborador esta asignado a una tarea. Podra darlo de baja despues de asignar otro colaborador a la misma "

        document.getElementById('isAssigned').innerHTML = theComment;

    } else {
        coworker.deleteItem(theId);
    }

    formCoworker.reset();
})

