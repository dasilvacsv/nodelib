const { log } = require('./helpers/errorLog');
const ZKLib = require('./zklib')
const test = async () => {


    let zkInstance = new ZKLib('192.168.1.225', 4370, 10000, 4000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()


        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
    } catch (e) {
    }

    // Disconnect the machine ( don't do this when you need realtime update :))) 
   const users = await zkInstance.getUsers();
    console.log(users); 
 
     /* zkInstance.getRealTimeLogs((logs) => {
        console.log(logs);
    });  */
}

test()