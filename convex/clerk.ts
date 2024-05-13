// Removed the unnecessary "use node" statement

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { v } from "convex/values";

import { Webhook } from "svix";

import { internalAction } from "./_generated/server";

const WEB_HOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;

export const fulfill = internalAction({
    args: {
        headers: v.any(),
        payload: v.string(),
    },
    handler: async (ctx, args) => {
        const wh = new Webhook(WEB_HOOK_SECRET);
        try {
            const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
            return payload;
        } catch (error) {
            // Handle verification error here (e.g., log the error)
            console.error("Error verifying webhook:", error);
        }
    },
});
