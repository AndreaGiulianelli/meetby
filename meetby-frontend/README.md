# meetby frontend

This is the frontend of the *meetby* platform.

## Usage
You need to specify the following environment variables:
- `VITE_MEETBY_BACKEND_BASE_URL`: the base url of the meetby platform backend

### Docker:
1. Build the docker image:
    ``` bash
    docker build -t meetby-frontend --build-arg="VITE_MEETBY_BACKEND_BASE_URL=<MEETBY-BACKEND-BASE-UR>" .
    ```
2. Run the docker container
    ``` bash
    docker run meetby-frontend
    ```

    1. If you want to use it from the external you need to provide a port mapping to port 80.
