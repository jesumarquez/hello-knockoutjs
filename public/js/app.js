$(function(){
    function UserViewModel(data){
        var self = this
        
        var userMapping = {
            create: function(options){
                var vm = ko.mapping.fromJS(options.data)
                return vm
            }
        }
        
        /**
         * Properties
         */
        ko.mapping.fromJS(data, {
                users: userMapping
            }, self)
        
        self.user = ko.observable(null)
        self.mode = ko.observable('list')
        
        /**
         * Methods
         */
        self.newUser = function(){
            self.user({name: '', enabled: false})
            self.mode('new')
        }
        self.edit = function(u){
            self.user(u)
            self.mode('edit')
        }
        self.save = function(){
            var u = ko.toJSON(self.user)
            var type = self.mode() === 'new' ? 'POST' : 'PUT'
            $.blockUI()

            $.ajax({
                url: '/user',
                type: type,
                contentType: "application/json",
                data: JSON.stringify({user: u}),
                dataType: 'json',
                success: function(res){
                    ko.mapping.fromJS(res, self)
                    self.user(null)
                    self.mode('list')
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.error(textStatus, errorThrown)
                },
                complete: function () {
                    $.unblockUI()
                }
            })
        }
        self.cancel = function(){
            self.user(null)
            self.mode('list')
        }
        self.changeValue = function(user){
            var u = ko.toJSON(user)
            $.blockUI()
            $.ajax({
                url: '/user',
                type: 'put',
                contentType: "application/json",
                data: JSON.stringify({user: u}),
                dataType: 'json',
                success: function(res){
                    ko.mapping.fromJS(res, self)
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.error(textStatus, errorThrown)
                },
                complete: function () {
                    $.unblockUI()
                }
            })
            
            alert('event changeValue ' + user.enabled())
        }
        self.myBindingChange = function (e) {
            alert('event myBindingChange ' + e.enabled())
        }
    }

    ko.bindingHandlers.myBinding = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
            //alert('init')
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever any observables/computeds that are accessed change
            // Update the DOM element based on the supplied values here.
            // alert('update: ' + ko.unwrap(valueAccessor()))
            $(element).trigger('myBindingChange')
        }
    }
    $.get('/user')
        .then(function (res) {
            ko.applyBindings(new UserViewModel(res))
        })
})