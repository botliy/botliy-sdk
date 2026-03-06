export interface BotliyConfig {
    /** Your botliy API token */
    apiToken: string;
    /** Your bot's Discord ID */
    botId: string;
    /** Custom base URL (optional, defaults to https://botliy.online) */
    baseURL?: string;
    /** Optional Webhook Secret if you're using webhooks */
    webhookSecret?: string;
}
export interface PostStatsOptions {
    /** Total number of servers your bot is in */
    server_count: number;
    /** Total number of shards your bot is using (defaults to 1) */
    shard_count?: number;
}
export interface StatsResponse {
    error: boolean;
    server_count: number;
    shard_count: number;
    message?: string;
}
export interface Vote {
    username: string;
    id: string;
    date: string;
}
export interface VotesResponse {
    error: boolean;
    votes: Vote[];
    message?: string;
}
export interface CheckVoteResponse {
    error: boolean;
    voted: number;
    message?: string;
}
export declare class Botliy {
    private api;
    private config;
    constructor(config: BotliyConfig);
    /**
     * Post your bot's current server and shard count.
     * Recommended to run every 15-30 minutes.
     */
    postStats(options: PostStatsOptions): Promise<StatsResponse>;
    /**
     * Retrieve your bot's registered server count from botliy.
     */
    getStats(): Promise<StatsResponse>;
    /**
     * Returns a list of the 1,000 most recent votes for your bot.
     */
    getVotes(): Promise<VotesResponse>;
    /**
     * Check whether a specific user has voted for your bot in the last 12 hours.
     */
    checkVote(userId: string): Promise<CheckVoteResponse>;
    /**
     * Utility method to verify webhook payloads if you're using Express/Fastify.
     * Compares the provided authorization header with your configured webhook secret.
     */
    verifyWebhook(authHeader: string | undefined): boolean;
}
export default Botliy;
//# sourceMappingURL=index.d.ts.map