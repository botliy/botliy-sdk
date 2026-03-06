import axios, {} from 'axios';
export class Botliy {
    api;
    config;
    constructor(config) {
        if (!config.apiToken)
            throw new Error('Botliy SDK: apiToken is required.');
        if (!config.botId)
            throw new Error('Botliy SDK: botId is required.');
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
    async postStats(options) {
        try {
            const payload = {
                server_count: options.server_count,
                shard_count: options.shard_count || 1,
            };
            const response = await this.api.post(`/api/bots/${this.config.botId}/stats`, payload);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`Botliy API Error [${error.response.status}]: ${error.response.data?.message || 'Failed to post stats'}`);
            }
            throw error;
        }
    }
    /**
     * Retrieve your bot's registered server count from botliy.
     */
    async getStats() {
        try {
            const response = await this.api.get(`/api/bots/${this.config.botId}/stats`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`Botliy API Error [${error.response.status}]: ${error.response.data?.message || 'Failed to get stats'}`);
            }
            throw error;
        }
    }
    /**
     * Returns a list of the 1,000 most recent votes for your bot.
     */
    async getVotes() {
        try {
            const response = await this.api.get(`/api/bots/${this.config.botId}/votes`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`Botliy API Error [${error.response.status}]: ${error.response.data?.message || 'Failed to get votes'}`);
            }
            throw error;
        }
    }
    /**
     * Check whether a specific user has voted for your bot in the last 12 hours.
     */
    async checkVote(userId) {
        if (!userId)
            throw new Error('Botliy SDK: userId is required to check a vote.');
        try {
            const response = await this.api.get(`/api/bots/${this.config.botId}/check?userId=${userId}`);
            return response.data;
        }
        catch (error) {
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
    verifyWebhook(authHeader) {
        if (!this.config.webhookSecret) {
            throw new Error('Botliy SDK: webhookSecret was not provided in the constructor configuration.');
        }
        return authHeader === this.config.webhookSecret;
    }
}
export default Botliy;
//# sourceMappingURL=index.js.map