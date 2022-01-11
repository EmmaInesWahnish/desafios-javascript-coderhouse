export function renderSelector(anyArray, $inSelect) {
    //renderizar opciones del array anyArray dentro de un select
    anyArray.forEach(element => {
        let myOption = element.id;
        $inSelect.append(`<option id='O'+${element.id} >
                                ${myOption}  
                              </option>`);
        });
}