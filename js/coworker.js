export class Coworker {
    constructor() {
        this.lista = JSON.parse(localStorage.getItem('coworker')) || [];
    }

    createItem(item) {
        this.lista.push(item)
        localStorage.setItem('coworker', JSON.stringify(this.lista))
    }

    findAllItems() {
        return this.lista;
    }

    findOneByIdItem(itemId) {
        const item = this.lista.find(element => element.id === itemId)

        if (!item) {
            alert('No existe colaborador con id: ' + itemId);
        } else {
            alert("Operacion de colaborador " + itemId + " exitosa");
        }

        return item;
    }

    findCalByIdItem(itemId) {
        const item = this.lista.find(element => element.id === itemId)

        return item;
    }

    updateValuePerHour(itemId, valorHora) {
        if (Number(diasTrabajo) > 0) {
            const item = this.findOneByIdItem(itemId);
            const index = this.lista.indexOf(item);
            this.lista[index].valuePerHour = valorHora;
            localStorage.setItem('coworker', JSON.stringify(this.lista))
        }
    }

    updateHoursPerDay(itemId, valorHora) {
        if (Number(diasTrabajo) > 0) {
            const item = this.findOneByIdItem(itemId);
            const index = this.lista.indexOf(item);
            this.lista[index].valuePerHour = valorHora;
            localStorage.setItem('coworker', JSON.stringify(this.lista))
        }
    }

    deleteItem(itemId) {
        const item = this.findOneByIdItem(itemId);
        if (item) {
            const index = this.lista.indexOf(item);
            this.lista.splice(index, 1);
            localStorage.setItem('coworker', JSON.stringify(this.lista));
        }
    }

    getValuePerDay() {
        return this.hoursPerDay * this.valuePerHour;
    }
}