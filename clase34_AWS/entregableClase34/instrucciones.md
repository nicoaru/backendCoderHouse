Comando para levantar el el cluster de servidores
    pm2 start src/main.js --name Server8080 --watch -- -- --port 8080 --mode FORK
    pm2 start src/main.js --name Server8082 --watch -- -- --port 8082 --mode FORK
    pm2 start src/main.js --name Server8083 --watch -- -- --port 8083 --mode FORK
    pm2 start src/main.js --name Server8084 --watch -- -- --port 8084 --mode FORK
    pm2 start src/main.js --name Server8085 --watch -- -- --port 8085 --mode FORK

Puertos 8082, 8083, 8084 y 8085 reciben las request a /api/randoms
Puerto 8080 recibe el resto de las request