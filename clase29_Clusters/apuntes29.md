. En Powershell:
    . tasklist /fi "imagename eq node.exe"
        lista todos los procesos de node.js activos
    . taskkill /pid <PID> /f    
        mata un proceso por su número de PID



Clusters
    . Cluster refiere al uso de subprocesos que permite aprovechar la capacidad del procesador del servidor donde se ejecute la aplicación.
    . El módulo cluster de Node permite crear fácilmente procesos hijo.
    . Crea (similar Fork) una copia del proceso principal que pasa a llamarse Master, y delega la carga de trabajo repartiéndola entre los Workers (las copias credas).
    . De esa manera se evita la sobrecarga a un solo núcleo del procesador.
    . El Master se va a dedicar únicamente a gestionar a los workers.


Forever
    . npm i -g forever -> instala global
    . si lo instalamos local -> "npx" antes de los comandos
    . ejecuta el servidor y lo deja corriendo en segundo plano sin necesidad de tener la consola abierta
    . reinicia el servidor si el mismo se detiene (por ejemplo por una uncaugth exception)
    . con la opcion --watch se reinicia cada vez que se produce una cambio en los archivos


pm2
    . npm i -g pm2 -> instala global
    . si lo instalamos local -> "npx" antes de los comandos
    . ejecuta el servidor y lo deja corriendo en segundo plano
    . reinicia el servidor si el mismo se detiene (por ejemplo por una uncaugth exception)
    . con la opcion --watch se reinicia cada vez que se produce una cambio en los archivos
    . pero a su vez viene con la opción de ejecutarlo con CLUSTER incorporado. No hace falta crearlo en el codigo. 
    . sino la elegimos se ejecuta en modo fork
    . podemos elegir como ejecutarlo
    . lo que viene después del ultimo "--" son parámetros extra
        . pm2 start server.js --name="Server1" --watch -- 8081   
        . pm2 start server.js --name="Server2" --watch -i max -- 8082

Modulos: 
    . forever
    . pm2