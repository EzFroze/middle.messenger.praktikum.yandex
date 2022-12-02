FROM node:18

WORKDIR /var/www

EXPOSE 3000

# Переносим все в временную папку
# Устанавливаем зависимости и билдим проект
# Выносим папку на уровень выше и удаляем temp
COPY . ./temp

RUN cd temp && npm install && npm run build

RUN mv ./temp/dist ./

RUN rm -rf temp

# Забираем package и ставим зависимости для прода
# Копируем сервер и запускаем
COPY ./package*.json ./

RUN npm ci --production

COPY ./server.ts ./

CMD npm run start:docker
