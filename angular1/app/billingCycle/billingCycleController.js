(function () {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'msgs',
        'tabs',
        'consts',
        BillingCycleController
    ])

    function BillingCycleController($http, msgs, tabs, consts) {
        const vm = this
        const url = `${consts.apiUrl}/billingCycles`
        console.log(consts.apiUrl)

        vm.refresh = () => {
            $http.get(url).then(function (response) {
                vm.billingCycle = { credits: [{}], debts: [{}] }
                vm.billingCycles = response.data
                vm.calculateValues()
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

        vm.showTabUpdate = (billingCycle) => {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, { tabUpdate: true })

        }

        vm.showTabDelete = (billingCycle) => {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, { tabDelete: true })
        }

        vm.update = () => {
            const updateUrl = `${url}/${vm.billingCycle._id}`
            $http.put(updateUrl, vm.billingCycle).then(function (response) {
                vm.refresh()
                vm.billingCycle = response.data
                msgs.addSuccess('Operação realizada com Sucesso!!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.delete = () => {
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function (response) {
                vm.refresh()
                vm.billingCycle = response.data
                msgs.addSuccess('Operação realizada com Sucesso!!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }

        vm.addCredit = (index) => {
            vm.billingCycle.credits.splice(index + 1, 0, {})

        }

        vm.cloneCredit = (index, { name, value }) => {
            vm.billingCycle.credits.splice(index + 1, 0, { name, value })
            vm.calculateValues()
        }

        vm.deleteCredit = (index) => {
            if (vm.billingCycle.credits.length > 1) {
                vm.billingCycle.credits.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.addDebt = (index) => {
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = (index, { name, value, status }) => {
            vm.billingCycle.debts.splice(index + 1, 0, { name, value, status })
            vm.calculateValues()
        }

        vm.deleteDebt = (index) => {
            if (vm.billingCycle.debts.length > 1) {
                vm.billingCycle.debts.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.calculateValues = () => {
            vm.credit = 0
            vm.debt = 0
            if (vm.billingCycle) {
                vm.billingCycle.credits.forEach(({ value }) => {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })
                vm.billingCycle.debts.forEach(({ value }) => {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                })
            }
            vm.total = vm.credit - vm.debt
        }
        vm.refresh()
    }
})()