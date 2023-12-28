# logging_config.py
import os
import logging

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Configure the logger
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(os.path.join(BASE_DIR, 'django.log')),
    ]
)