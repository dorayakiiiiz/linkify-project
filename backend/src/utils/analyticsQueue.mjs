import Analytic from "../models/Analytic.mjs";
import Link from "../models/Link.mjs";
import Product from "../models/Product.mjs";

// In-memory queue buffer for analytics events
const eventQueue = [];
const BATCH_SIZE = 50;
const FLUSH_INTERVAL = 10000; // 10 seconds

// Flush queued events to MongoDB in bulk
export const flushAnalyticsQueue = async () => {
    if (eventQueue.length === 0) return;

    // Drain current queue items
    const eventsToProcess = eventQueue.splice(0, eventQueue.length);

    try {
        // 1. Bulk insert analytics logs
        await Analytic.insertMany(eventsToProcess);

        // 2. Count aggregate link and product clicks in this batch
        const linkClickCounts = {};
        const productClickCounts = {};

        eventsToProcess.forEach(evt => {
            if (evt.type === 'link_click' && evt.targetId) {
                linkClickCounts[evt.targetId] = (linkClickCounts[evt.targetId] || 0) + 1;
            } else if (evt.type === 'shop_click' && evt.targetId) {
                productClickCounts[evt.targetId] = (productClickCounts[evt.targetId] || 0) + 1;
            }
        });

        // 3. Batch increment Link clickCount
        const linkOperations = Object.keys(linkClickCounts).map(id => ({
            updateOne: {
                filter: { _id: id },
                update: { $inc: { clickCount: linkClickCounts[id] } }
            }
        }));

        if (linkOperations.length > 0) {
            await Link.bulkWrite(linkOperations);
        }

        // 4. Batch increment Product clickCount
        const productOperations = Object.keys(productClickCounts).map(id => ({
            updateOne: {
                filter: { _id: id },
                update: { $inc: { clickCount: productClickCounts[id] } }
            }
        }));

        if (productOperations.length > 0) {
            await Product.bulkWrite(productOperations);
        }

    } catch (err) {
        console.error("Error flushing analytics queue:", err);
    }
};

// Add event to queue and auto-flush if batch size is reached
export const enqueueAnalyticsEvent = (eventData) => {
    eventQueue.push(eventData);
    if (eventQueue.length >= BATCH_SIZE) {
        flushAnalyticsQueue();
    }
};

// Start periodic flush timer
// các queue còn lại ko có tính năng này
setInterval(flushAnalyticsQueue, FLUSH_INTERVAL);

// Flush remaining queued events on server shutdown
// SIGINT: signal interrupt -> user ctrl + C ngắt app
process.on('SIGINT', async () => {
    await flushAnalyticsQueue();
});
// SIGTERM: signal terminate -> các công cụ quản lí gửi lệnh kill ngắt app
process.on('SIGTERM', async () => {
    await flushAnalyticsQueue();
});
