export function renderSelector(anyArray, inSelect) {
    anyArray.forEach(element => {
        let myOption = element.id;
       const theOption = document.createElement('option');
        theOption.innerHTML = `<option id='O'+${element.id} >
                                ${myOption}  
                              </option>`
    
        inSelect.appendChild(theOption);
    });
}