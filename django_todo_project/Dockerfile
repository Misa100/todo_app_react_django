# Utilisez une image Python officielle comme base
FROM python:3.9-slim

# Mettre à jour les paquets et installer sqlite3
RUN apt-get update && apt-get install -y sqlite3 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement le fichier de configuration des dépendances (requirements.txt)
COPY requirements.txt /app/

# Installer les dépendances de l'application
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le code du projet dans le container
COPY . /app/

# Exposer le port 8000 (ou le port utilisé par votre application)
EXPOSE 8000

# Commande par défaut pour exécuter l'application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]