(function () {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'msgs',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = () => {
            $http.get(url).then(function (response) {
                vm.billingCycle = {}
                vm.billingCycles = response.data
                tabs.show(vm, { tabList: true, tabCreate: true })
            })
        }

        vm.create = () => {
            $http.post(url, vm.billingCycle).then(function (response) {
                vm.refresh()
                vm.billingCycle = response.data
                msgs.addSuccess('Operação realizada com Sucesso!!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }
    }
})()