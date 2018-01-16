$(function(){
    function UserViewModel(data){
        var self = this
        
        var userMapping = {
            create: function(options){
                var vm = ko.mapping.fromJS(options.data)
                return vm
            }
        }
        
        ko.mapping.fromJS(data, {
                users: userMapping
            }, self)
        
        self.user = ko.observable(null)
        self.changeValue = function(u){
            u.enabled(!u.enabled())
        }
        self.newUser = function(){
            self.user({name: '', enabled: false})
        }
        self.save = function(){
            var u = ko.toJSON(self.user)
            $.post('/user', {user: u})
                .then(function(res){
                    ko.mapping.fromJS(res, self)
                })
        }
    }

    $.get('/user')
        .then(function (res) {
            ko.applyBindings(new UserViewModel(res))
        })
})