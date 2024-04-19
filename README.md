
# Explanation

This project is a simple API that allows you to create a ticket from a text input. 
I choose a simplest architecture with a domain directory for ticket which is compose of the service and the interface.
The interface containes the interfaces for product and ticket. The service contains the logic to parse the payload and create the ticket and product in the database.

I don't use orm but I could have used some. I prefer to use the native driver to have a better control of the queries for a little project like this.

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