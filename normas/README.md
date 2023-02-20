<!-- Build Image
sudo docker-compose build

Run instances
sudo docker-compose up

Run mysql on Docker instance
docker ps

docker exec -it IMAGE NAME  mysql -uroot -p
host 0.0.0.0


Para cada pasta de view que adicionar, deve tambem adicionar a linha de codigo no ficheiro app.js linha 23
app.use('/users', express.static(__dirname + '/public'));
--users é o nome da pasta que esta dentro da view


Create migration

sequelize migration:generate                Generates a new migration file
sequelize migration:create                  Generates a new migration file
sequelize model:create                      Generates a model and its migration
https://sequelize.org/v7/ 
-->