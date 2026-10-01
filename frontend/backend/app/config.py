import os

class Settings:
    PROJECT_NAME: str = "AgriCrisis Command Backend"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    TEAM_NAME: str = "Team Titans"
    EVENT: str = "GATEWAYS 2026 - Round 1"
    
    # Database URL: SQLite by default; switches to PostgreSQL in production
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./agri_crisis.db")
    
    # OpenWeather / Agri Weather API (optional mockable key)
    WEATHER_API_KEY: str = os.getenv("WEATHER_API_KEY", "demo_weather_api_key")
    
    # Default Coordinates (Mandya, Karnataka)
    DEFAULT_LAT: float = 12.5234
    DEFAULT_LON: float = 76.8967

settings = Settings()
