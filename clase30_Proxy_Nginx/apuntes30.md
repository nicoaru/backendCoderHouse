

Reverse Proxy
    . Balancear carga distribuyendola entre varios servidores
        . es decir que voy a levanto por ejemplo 2 copias de un mismo servidor (incluso cada uno puede estar en modo Cluster) escuchando en diferentes puertos, y el proxy (que escucha en un tercer puerto) redirige las peticiones a esos dos servidores 
    . Mejorar la seguridad
    . Caching. Permite almacenar en cache peticiones repetidas. Tanto contenido estático como dinámico. 
    . Comprimir las respuestas de servidor, para que ocupen menor ancho de banda
    . Cifrado SSL
    . Monitoreo y registo del tráfico de todas las peticiones que pasen por él


Nginx
    . Permite crear un reverse-proxy
    . Puede servir a varias aplicaciones, las cuales tendran cada una sus varios servidores
    . Los servidores de cada aplicación los debo levantar como siempre
        . Pero deben ser levantado con pm2
    . 