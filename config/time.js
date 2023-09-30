const cron = require('node-cron');
const axios = require('axios');

async function scheduletime() {
    try {
        const interval = 5000; // Set the interval in milliseconds (e.g., 5000ms = 5 seconds)
        const url = 'http://localhost:4000/fetch/time/all';

        setInterval(async () => {
            const response = await axios.get(url);
            console.log('Request sent to', url);
            console.log('Response:', response.data);

            // Check if the response is an array
            if (Array.isArray(response.data)) {
                response.data.forEach((item) => {
                    // Extract Hours, Minutes, and Delay from each item
                    const { Hours, Minutes, Delay } = item;
                    console.log(Hours, Minutes, Delay);

                    // Schedule the task for Motor_on
                    scheduleTask(Hours, Minutes, 'Motor_on', Delay);

                    // Now you can use Hours and Minutes in your script
                    console.log(`Hours: ${Hours}, Minutes: ${Minutes}`);
                });
            } else {
                console.error('Non-array response from the API.');
            }
        }, [interval])
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}

// Function to schedule a task with unique properties
function scheduleTask(Hours, Minutes, command, Delay) {
    cron.schedule(`${Minutes} ${Hours} * * *`, async () => {
        try {
            const response = await axios.put(`https://api.thingspeak.com/talkbacks/49659/commands/36176282.json?api_key=O0CSA2WKDBOWXZLR&command_string=${command}`);
            console.log(`Task scheduled for ${Hours}:${Minutes} executed with command: ${command}`);
            console.log(response.data);
            setTimeout(async () => {
                const response = await axios.put(`https://api.thingspeak.com/talkbacks/49659/commands/36176282.json?api_key=O0CSA2WKDBOWXZLR&command_string=motor_of`);
                console.log("Second message");
                console.log(`Task scheduled for ${Hours}:${Minutes} executed with command: ${command}`);
                console.log(response.data);
            }, Delay * 60000);

        } catch (error) {
            console.error(`Error executing the task with command ${command}:`, error.message);
        }
    });
}

module.exports = { scheduletime };

// Call the function to start scheduling
scheduletime();
