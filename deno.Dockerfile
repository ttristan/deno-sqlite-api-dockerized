# https://github.com/hayd/deno-docker
FROM hayd/alpine-deno:1.6.1

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when vendors.ts is modified).
# Ideally cache vendors.ts will download and compile _all_ external files used in index.ts.
COPY vendors.ts .
RUN deno cache vendors.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the index app so that it doesn't need to be compiled each startup/entry.
RUN deno cache index.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "index.ts"]
