import Link from "../models/Link.mjs";
import Product from "../models/Product.mjs";
import { checkLinkContent, checkProductContent } from "../services/moderationService.mjs";

// In-memory queue buffer for content moderation tasks
const moderationQueue = [];

// Worker configuration
// const CONCURRENCY_LIMIT = 3;
// let activeWorkers = 0;

// Helper to delay execution
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Worker process to execute tasks concurrently up to CONCURRENCY_LIMIT
const processQueue = async () => {
    // while (activeWorkers < CONCURRENCY_LIMIT && moderationQueue.length > 0) {
    while (moderationQueue.length > 0) {
        const item = moderationQueue.shift();
        if (!item || !item.id) continue;

        // activeWorkers++;

        // (async () => {
        try {
            if (item.type === 'link') {
                await checkLinkContent(item.id, item.title, item.url);
            } else if (item.type === 'product') {
                await checkProductContent(item.id, item.name, item.price, item.buyLink);
            }
        } catch (err) {
            console.error(`Moderation queue processing error for ${item.type} ${item.id}:`, err.message);
            // } finally {
            // activeWorkers--;
            // await delay(100);
            // processQueue();
        }
        // })();
    }
};

// Enqueue a link or product item for background AI moderation
export const enqueueModerationItem = (item) => {
    if (!item || !item.id || !item.type) return;

    // Prevent duplicate entries for the same item ID
    const exists = moderationQueue.some(q => q.id.toString() === item.id.toString() && q.type === item.type);
    if (!exists) {
        moderationQueue.push(item);
    }

    processQueue();
};

// Recover any pending unmoderated items from MongoDB on server startup
// export const recoverPendingModerations = async () => {
//     try {
//         const pendingLinks = await Link.find({ moderationStatus: 'pending', deletedBy: null }).lean();
//         const pendingProducts = await Product.find({ moderationStatus: 'pending', deletedBy: null }).lean();

//         let count = 0;
//         pendingLinks.forEach(link => {
//             enqueueModerationItem({
//                 id: link._id,
//                 type: 'link',
//                 title: link.title,
//                 url: link.url
//             });
//             count++;
//         });

//         pendingProducts.forEach(prod => {
//             enqueueModerationItem({
//                 id: prod._id,
//                 type: 'product',
//                 name: prod.name,
//                 buyLink: prod.buyLink,
//                 price: prod.price
//             });
//             count++;
//         });

//         if (count > 0) {
//             console.log(`[Moderation Queue] Recovered ${count} pending item(s) from Database.`);
//         }
//     } catch (err) {
//         console.error("Failed to recover pending moderations from Database:", err.message);
//     }
// };

export default {
    enqueueModerationItem,
    // recoverPendingModerations
};
