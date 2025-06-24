# carmatch-server
Server (backend) for CarMatch project, built with Django REST Framework

# How to use
1. Install Python 3.12+
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run Django server:
   ```
   python manage.py runserver
   ```
4. Test server at `http://localhost:8000/api/`
5. Login at `http://localhost:8000/api-auth/login` with username `admin` and password `admin123`
6. Browse API at `http://localhost:8000/api/schema/swagger-ui/` or `http://localhost:8000/api/schema/redoc/`

# Switching between JWT and session-based authentication
- To disable JWT and switch to session-based authentication, open `settings.py`, comment out the line `'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication',),` under `REST_FRAMEWORK`.
