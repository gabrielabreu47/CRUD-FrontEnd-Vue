var vm = new Vue({
    el: "#container",
    data: {
        url: 'https://localhost:44331/api/items',
        items: [],
        edit: false,
        Id: '',
        Name: '',
        Description: '',

    },
    mounted: async function() {
        await this.getAll();
    },
    methods: {
        update: async function() {
            if (!this.Name) throw 'Name cannot be empty';
            if (!this.Description) throw 'Description cannot be empty';
            let UpdateDate = Date.now();
            let newItem = { Name, Description, UpdateDate };
            await fetch(this.url + `/${this.Id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(newItem)
            });
        },
        add: async function() {
            if (!this.Name) throw 'Name cannot be empty';
            if (!this.Description) throw 'Description cannot be empty';
            await fetch(this.url, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    Name: this.Name,
                    Description: this.Description,
                    Deleted: false
                })
            });
        },
        deleteItem: async function(id) {
            await fetch(this.url + `/${id}`, {
                method: 'DELETE'
            });
        },
        getAll: async function() {
            let listOfItemsOData = await fetch(this.url)
                .then(response => response.json());
            let { value } = listOfItemsOData;
            this.items = value;
        },
        clear: async function() {
            this.items = [],
                this.edit = false,
                this.Id = '',
                this.Name = '',
                this.Description = ''
        },
        fillInputs: async function(Id, Name, Description) {
            this.Id = Id,
                this.Name = Name,
                this.Description = Description,
                this.edit = true
        },
        redirectAction: async function() {
            if (this.edit) {
                this.update();
            } else {
                this.add();
            }
            this.clear();
            this.getAll();
        }
    },
    computed: {
        hasItems: function() {
            if (this.items.length >= 1) {
                return true;
            }
            return false;
        }
    }

})