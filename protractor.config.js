
exports.config ={
    specs:['test/client/clientServices.js'],
    framework:'mocha',
    mochaOpts:{
        reporter:'spec',
        slow:3000,
        enableTimeouts: false
    },
    capabilities:{
        'browserName':'chrome'
    }
}