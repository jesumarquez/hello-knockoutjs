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
    }

    $.get('/users')
        .then(function (res) {
            ko.applyBindings(new UserViewModel(res))
        })
})