import { useEffect, useState } from "react";
import { GET_1 } from "../api/api-reader";
import { IOT_GET5, IOT_GET6 } from "../api/api-iot";

export const Tanklevel = () => {
    const [levelReading, SetlevelReading] = useState("");

    useEffect(() => {
        GET_1()
            .then((response) => {
                let tanklevel = response.data.feeds[0].field1;
                SetlevelReading(tanklevel);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return levelReading;
};

export const Higlevel = () => {
    const [levelhig, Setlevelhig] = useState(0);

    useEffect(() => {
        IOT_GET5(35655482)
            .then((response) => {
                const tanklevel = response.data.command_string;
                // Extract numeric part using regex
                let numericPart = tanklevel.match(/\d+/);

                if (numericPart) {
                    // Convert the numeric part to a number
                    let numericValue = parseInt(numericPart[0], 10);
                    Setlevelhig(numericValue);
                } else {
                    console.log("No numeric part found in tanklevel");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return levelhig;
};

export const Lowlevel = () => {
    const [levellow, Setlevellow] = useState(0);

    useEffect(() => {
        IOT_GET6(36176323)
            .then((response) => {
                const tanklevel = response.data.command_string;
                // Extract numeric part using regex
                let numericPart = tanklevel.match(/\d+/);

                if (numericPart) {
                    // Convert the numeric part to a number
                    let numericValue = parseInt(numericPart[0], 10);
                    Setlevellow(numericValue);
                } else {
                    console.log("No numeric part found in tanklevel");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return levellow;
};

export const Level_dif = () => {
    const [diflevel, Setdiflevel] = useState();
    useEffect(() => {
        IOT_GET6(35845228).then((response) => {
            const tanklevel = response.data.command_string;
            let numericPart = tanklevel.match(/\d+/);
            if (numericPart) {
                // Convert the numeric part to a number
                let numericValue = parseInt(numericPart[0], 10);
                Setdiflevel(numericValue);
            } else {
                console.log("No numeric part found in tanklevel");
            }
        })
    })
    return diflevel
}
export const tankpercentage = () => {
    const level = parseFloat(Tanklevel());
    const high = parseFloat(Higlevel());

    if (!isNaN(level) && !isNaN(high)) {
        return (level / high) * 100;
    } else {
        return 0; // Handle the case where the values are not valid numbers
    }
};
