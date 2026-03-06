import requests
import typing

class BotliyAPIError(Exception):
    pass

class Botliy:
    def __init__(self, api_token: str, bot_id: str, webhook_secret: str = None, base_url: str = "https://botliy.online"):
        """
        Initialize the Botliy SDK.
        
        :param api_token: Your Botliy API token
        :param bot_id: Your bot's Discord ID
        :param webhook_secret: Your optional webhook secret for verification
        :param base_url: API base URL, defaults to https://botliy.online
        """
        if not api_token:
            raise ValueError("Botliy SDK: api_token is required")
            
        if not bot_id:
            raise ValueError("Botliy SDK: bot_id is required")
            
        self.api_token = api_token
        self.bot_id = bot_id
        self.webhook_secret = webhook_secret
        self.base_url = base_url.rstrip("/")
        
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": self.api_token,
            "Content-Type": "application/json",
            "User-Agent": "Botliy-Python-SDK/1.0.0"
        })

    def _handle_response(self, response: requests.Response) -> typing.Dict:
        try:
            data = response.json()
        except Exception:
            raise BotliyAPIError(f"Botliy API Error: Invalid JSON response [{response.status_code}]")
            
        if response.status_code not in (200, 201):
            message = data.get("message", "Unknown error")
            raise BotliyAPIError(f"Botliy API Error [{response.status_code}]: {message}")
            
        return data

    def post_stats(self, server_count: int, shard_count: int = 1) -> typing.Dict:
        """
        Post your bot's current server and shard count.
        """
        url = f"{self.base_url}/api/bots/{self.bot_id}/stats"
        payload = {
            "server_count": server_count,
            "shard_count": shard_count
        }
        
        response = self.session.post(url, json=payload)
        return self._handle_response(response)
        
    def get_stats(self) -> typing.Dict:
        """
        Retrieve your bot's registered server count from Botliy.
        """
        url = f"{self.base_url}/api/bots/{self.bot_id}/stats"
        response = self.session.get(url)
        return self._handle_response(response)

    def get_votes(self) -> typing.Dict:
        """
        Returns a list of the 1,000 most recent votes for your bot.
        """
        url = f"{self.base_url}/api/bots/{self.bot_id}/votes"
        response = self.session.get(url)
        return self._handle_response(response)
        
    def check_vote(self, user_id: str) -> typing.Dict:
        """
        Check whether a specific user has voted for your bot in the last 12 hours.
        """
        if not user_id:
            raise ValueError("Botliy SDK: user_id is required")
            
        url = f"{self.base_url}/api/bots/{self.bot_id}/check"
        response = self.session.get(url, params={"userId": user_id})
        return self._handle_response(response)
        
    def verify_webhook(self, authorization_header: str) -> bool:
        """
        Utility method to verify webhook payloads.
        Compares the provided header with your webhook secret.
        """
        if not self.webhook_secret:
            raise ValueError("Botliy SDK: webhook_secret was not provided during initialization")
            
        return authorization_header == self.webhook_secret

