export function fillSelector(anyArray, AnyObject) {
    //coloca en anyArray las opciones que se quieren renderizar en un select de un objeto determinado   
    anyArray = [];
    const anyObject = new AnyObject();
    const anyObjects = anyObject.findAllItems();
    anyObjects.forEach(element => {
        anyArray.push({
            id: element.id,
        });
    })
    return anyArray;
}