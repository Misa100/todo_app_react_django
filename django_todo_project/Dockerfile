# Utilisez une image Python officielle comme base
FROM python:3.9-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier de configuration des dépendances (requirements.txt)
COPY . /app/

# Installer les dépendances de l'application
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code de l'application dans le container
COPY . .

# Exposer le port 8000 (ou tout autre port que votre application utilise)
EXPOSE 8000

# Commande par défaut pour exécuter l'application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]