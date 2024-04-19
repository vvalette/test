
# Explanation

This project is a simple API that allows you to create a ticket from a text input. 

# Lauch the docker-compose to facilate the test

```bash
docker-compose up
```

# Curl Test
```bash	
curl -X POST \
  -H "Content-Type: text/plain" \
  -d "order: 12345\nvat: 10\ntotal: 110\nproduct: Formule(s) midi,aZde,14.9\nproduct: Café,IZ8z,2" \
  http://localhost:3000/ticket
```