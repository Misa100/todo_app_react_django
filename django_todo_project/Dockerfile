# Utiliser une image de base Python 3.9 slim
FROM python:3.9-slim

# Définir le répertoire de travail à /app
WORKDIR /app

# Copier uniquement le fichier de configuration des dépendances (requirements.txt)
COPY ./requirements.txt /app/

# Installer les dépendances de l'application
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste des fichiers de l'application dans /app
COPY . /app/

# Exposer le port 8000 pour l'application Django
EXPOSE 8000

# Lancer le serveur Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]