class storage{

    constructor(STORE){
        this.STORE = STORE;
    }

    insertObject(newObject){
        const objects = this.listObjects();  // Array
        objects.push(newObject);

        const newList = JSON.stringify(objects);

        localStorage.setItem(this.STORE, newList);
    }

    listObjects(){
        const raw = localStorage.getItem(this.STORE);
        return raw ? JSON.parse(raw) : [];
    }

  

    listLastObjects() {
        const raw = localStorage.getItem(this.STORE);
        const arr = JSON.parse(raw);
        const last = arr[arr.length - 1];
        return last ? JSON.parse(last) : [];
      }

    getObject(condition, value){
        const objects = this.listObjects();
        return objects.find(p => p[condition] == value) 
    }

    removeObjectFromArray(Object, Array){
        var index = Array.indexOf(Object)
        Array.splice(index, 1);
        localStorage.setItem(this.STORE, JSON.stringify(Array))
    }


    tradeObject(Array, newObject, OldObject){
        const arraySubstituido = Array.map((objeto) => {
            if (JSON.stringify(objeto) === JSON.stringify(OldObject)) {
                return newObject;
            } else {
                return objeto;
            }
        });
        localStorage.setItem(this.STORE, JSON.stringify(arraySubstituido))
    }
   
}   
