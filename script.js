
var app = angular.module("myApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("allLists", {
        url: "/allLists",
        template: "<add-new-list-component></add-new-list-component>"
    })
        .state("viewList",{
            url: "/viewList",
            params: {
                index: null
            },
            template: "<list-view-component></list-view-component>"
        })

    $urlRouterProvider.otherwise("/allLists")


})

app.factory("service", function(){
    var self = this;
    self.currentLists = [];
    self.selectedList = undefined;
    return {
        getCurrentLists: getCurrentLists,
        addNewListButton: addNewListButton,
        getList: getList
    }
    function getCurrentLists(){
        return self.currentLists
    }

    function addNewListButton(NewListName){
        var newList = {listName: NewListName, items: []}
        self.currentLists.push(newList);

    }

    function addListItem(addListItem){
        var newItem = {listItem: listItem, items: []}
    }

    function getList(index){
        return self.currentLists[index];
    }

})

app.component("addNewListComponent", {
    templateUrl: "AddNewList.html",

    controller: function(service){
        var vm = this;
        vm.NewListName = "";
        vm.currentLists = service.getCurrentLists();
        vm.addNewListButton = function(){
            service.addNewListButton(vm.NewListName)
            vm.NewListName = "";
        },
            vm.deleteListButton = function(){


            }
    }
});


app.component("listViewComponent", {
    templateUrl: "viewList.html",

    controller: function(service, $stateParams, $filter){
        console.log($stateParams)
        var vm = this;
        vm.list = service.getList($stateParams.index);
        console.log(vm.list);
        vm.addNewListItem = function(){
            vm.list.items.push({
                name: vm.inputText,
                completed: false
            })
            vm.inputText = '';
        }

        vm.clearChecked = function(){
            var notCompleted = $filter('filter')(vm.list.items, {completed: false});
            vm.list.items = notCompleted;

        }
    }
})
