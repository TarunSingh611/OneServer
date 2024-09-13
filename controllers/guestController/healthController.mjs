import vitals from "../../utils/vitals.mjs";

const healthCheck = (req, res) => {
    const message = "Website/Backend is working!";
    const vitalsData = vitals();
    res.status(200).json({
        message,
        vitalsData,
    });
};

export { healthCheck };
