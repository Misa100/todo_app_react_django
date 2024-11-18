# Dockerfile pour React
FROM node:16

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) dans le conteneur
COPY package*.json ./

# Installer les dépendances de React
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application React
CMD ["npm", "start"]
