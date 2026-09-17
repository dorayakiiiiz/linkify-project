// In-memory background email queue for asynchronous non-blocking email delivery

import sendEmail from "./sendEmail.mjs";

const emailQueue = [];
let isProcessing = false;

// Worker to process queued email jobs in background
const processEmailQueue = async () => {
    if (isProcessing) return;
    isProcessing = true;

    while (emailQueue.length > 0) {
        const item = emailQueue.shift();
        if (!item || !item.to) continue;

        try {
            await sendEmail(item.to, item.subject, item.text);
        } catch (err) {
            console.error(`Background email delivery failed for ${item.to}:`, err.message);
        }
    }

    isProcessing = false;
};

// Enqueue email job and trigger background worker
export const enqueueEmail = (to, subject, text) => {
    if (!to || !subject || !text) return;
    emailQueue.push({ to, subject, text });
    processEmailQueue();
};

export default { enqueueEmail };
