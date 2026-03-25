import ZKLib from 'zklib-js';
import axios from 'axios';

const device = new ZKLib("192.168.0.6", 4370, 10000, 4000);

export async function deviceconnec() {
    try {
        await device.createSocket();
        console.log("Connected ✅");

        const result = await device.getAttendances();

        const logs = result.data;

        await axios.post('http://localhost:8000/api/attendancelogs', {
            logs: logs
        });

        // console.log("Sent to API ✅");

        await device.disconnect();

        return logs;

    } catch (e) {
        console.error(e);
    }
}