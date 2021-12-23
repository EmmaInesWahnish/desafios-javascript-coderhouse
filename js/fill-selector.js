export function fillSelector(anyArray, AnyObject) {
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