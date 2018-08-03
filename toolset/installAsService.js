var Service = require('node-windows').Service
var path = require('path')

var svc = new Service({
    name : 'service-simulator',
    description: 'Javascript Simulates service responses',
    script : ''
})

svc.script = process.cwd() + path.sep + 'dist' + path.sep + 'index.js'
console.log(svc.script)

// listen for the install event which indicates the process is available as service
svc.on('install', function(){
    console.log('starting service:' + svc.name)
})

console.log('installing service:' + svc.name)
svc.install()
console.log('installed successfully')
//svc.uninstall()