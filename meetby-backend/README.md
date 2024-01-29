# meetby backend

This is the backend of the *meetby* platform.

## Usage
You need to specify the following environment variables:
- `MONGODB_CONNECTION_STRING`: the connection string of your MongoDB instance.
- `WEB_SERVER_PORT`: the port where expose the web server.
- `JWT_SECRET_KEY`: the key used by JWT algorithms to encode and decode tokens.

### Docker
1. Build the docker image:
    ``` bash
    docker build -t meetby-backend --build-arg="PORT=<WEB_SERVER_PORT>" .
    ```
2. Run the docker container:
    1. Provide a `.env` file with all the environment variable described above
    2. Run the container
        ``` bash
        docker run meetby-backend
        ```

        1. If you want to use it from the external you need to provide a port mapping to port `WEB_SERVER_PORT`.
        2. If you want to pass an environment file whose name is different from `.env` use the `--env-file <name>` parameter.
        3. If you want to be able to exit with `CTRL+C` use the `-it --init` parameters.