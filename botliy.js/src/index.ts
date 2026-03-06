import axios, { type AxiosInstance } from 'axios';

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
    voted: number; // 1 = voted, 0 = not voted
    message?: string;
}

export class Botliy {
    private api: AxiosInstance;
    private config: BotliyConfig;

    constructor(config: BotliyConfig) {
        if (!config.apiToken) throw new Error('Botliy SDK: apiToken is required.');
        if (!config.botId) throw new Error('Botliy SDK: botId is required.');

        this.config = {
            baseURL: 'https://botliy.online',
            ...config,
        };

        this.api = axios.create({
            baseURL: this.config.baseURL,
            headers: {
                'Authorization': this.config.apiToken,
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Post your bot's current server and shard count.
     * Recommended to run every 15-30 minutes.
     */
    async postStats(options: PostStatsOptions): Promise<StatsResponse> {
        try {
            const payload = {
                server_count: options.server_count,
                shard_count: options.shard_count || 1,
            };

            const response = await this.api.post(`/api/bots/${this.config.botId}/stats`, payload);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Botliy API Error [${error.response.status}]: ${error.response.data?.message || 'Failed to post stats'}`);
            }
            throw error;
        }
    }

    /**
     * Retrieve your bot's registered server count from botliy.
     */
    async getStats(): Promise<StatsResponse> {
        try {
            const response = await this.api.get(`/api/bots/${this.config.botId}/stats`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Botliy API Error [${error.response.status}]: ${error.response.data?.message || 'Failed to get stats'}`);
            }
            throw error;
        }
    }

    /**
     * Returns a list of the 1,000 most recent votes for your bot.
     */
    async getVotes(): Promise<VotesResponse> {
        try {
            const response = await this.api.get(`/api/bots/${this.config.botId}/votes`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Botliy API Error [${error.response.status}]: ${error.response.data?.message || 'Failed to get votes'}`);
            }
            throw error;
        }
    }

    /**
     * Check whether a specific user has voted for your bot in the last 12 hours.
     */
    async checkVote(userId: string): Promise<CheckVoteResponse> {
        if (!userId) throw new Error('Botliy SDK: userId is required to check a vote.');

        try {
            const response = await this.api.get(`/api/bots/${this.config.botId}/check?userId=${userId}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Botliy API Error [${error.response.status}]: ${error.response.data?.message || 'Failed to check vote'}`);
            }
            throw error;
        }
    }

    /**
     * Utility method to verify webhook payloads if you're using Express/Fastify.
     * Compares the provided authorization header with your configured webhook secret.
     */
    verifyWebhook(authHeader: string | undefined): boolean {
        if (!this.config.webhookSecret) {
            throw new Error('Botliy SDK: webhookSecret was not provided in the constructor configuration.');
        }
        return authHeader === this.config.webhookSecret;
    }
}

export default Botliy;
