# Dockerized deno + sqlite api
- run it: `docker-compose up -d --build`
- deno shell: `docker exec -it <container-name> /bin/sh`
- sqlite shell: `docker exec -it <container-name> bash`
- test it:  `curl localhost:8000` and `curl localhost:8000/init`
