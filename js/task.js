export class Task {
    constructor() {
        this.lista = JSON.parse(localStorage.getItem('task')) || [];
    }

    createItem(item) {
        this.lista.push(item)
        localStorage.setItem('task', JSON.stringify(this.lista))
    }

    findAllItems() {
        return this.lista;
    }

    findOneByIdItem(itemId) {
        const item = this.lista.find(element => element.id === itemId)

        if (!item) {
            throw new Error('No existe la tarea id:' + itemId)
        }

        return item;
    }

    updateWorkDays(itemId, diasTrabajo) {
        if (Number(diasTrabajo) > 0) {
            const item = this.findOneByIdItem(itemId);
            const index = this.lista.indexOf(item);
            this.lista[index].workDays = diasTrabajo;
            localStorage.setItem('task', JSON.stringify(this.lista));
            let donde = "F0" + index + "C04";
            document.getElementById(donde).innerHTML = diasTrabajo
        }
    }

    updateCoworker(itemId, colaborador) {
        const item = this.findOneByIdItem(itemId);
        const index = this.lista.indexOf(item);
        this.lista[index].assignedTo = colaborador;
        localStorage.setItem('task', JSON.stringify(this.lista));
        let donde = "F0" + index + "C02";
        document.getElementById(donde).innerHTML = colaborador;
    }


    completeTask(itemId) {
        const item = this.findOneByIdItem(itemId);
        const index = this.lista.indexOf(item);
        this.lista[index].state = "Si";
        localStorage.setItem('task', JSON.stringify(this.lista));
        let estado = "F0" + index + "C03";
        document.getElementById(estado).innerHTML = "Si"
    }

    deleteItem(itemId) {
        const item = this.findOneByIdItem(itemId);
        if (item) {
            const index = this.lista.indexOf(item);
            this.lista.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(this.lista));
        }
    }

    tasksPercentCompletion() {
        let total = 0;
        let totalDias = 0;
        this.lista.forEach(element => {
            if (element.state === "Si") {
                total = total + Number(element.workDays);
            }
            totalDias = totalDias + Number(element.workDays);
        });
        let percent = (100 * Number(total)) / Number(totalDias);
        return percent;
    }
}
