# base image
FROM node:14.18-bullseye



# make the 'app' folder the current working directory
#WORKDIR /app
WORKDIR /var/www/html


# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

RUN apt-get update && apt-get install -y apache2

COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html \
		&& a2enmod rewrite



# install project dependencies
		RUN npm install
		RUN npm install -g @vue/cli

# copy project files and folders to the current working directory (i.e. 'app' folder)
		COPY . .

# build app for production with minification

		EXPOSE 8080
		CMD [ "npm", "run", "serve" ]
