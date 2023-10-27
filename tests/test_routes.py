import os
import unittest
from dotenv import load_dotenv
from app import app

class TestRoutes(unittest.TestCase):
    def setUp(self):
        # Load environment variables from .env file
        load_dotenv('.env')
        self.app = app.test_client()

    def test_hello_world(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), 'Hello, World!')

    def test_global_parameter(self):
        response = self.app.get('/global_parameter')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), os.getenv('GLOBAL_PARAMETER'))

if __name__ == '__main__':
    unittest.main()