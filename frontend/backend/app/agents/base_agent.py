from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseAgent(ABC):
    def __init__(self, agent_id: str, name: str):
        self.agent_id = agent_id
        self.name = name

    @abstractmethod
    def analyze(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze current context and return agent observation, confidence, and action."""
        pass
