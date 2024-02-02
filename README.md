# meetby
Meetby is your meeting planning platform.

## Usage
There are two main possibilities:

### 1. Docker compose
1. Clone the repository
2. Create a `.env` file in the root directory with the following environment variables:
    - `JWT_SECRET_KEY`: the key used by JWT algorithms to encode and decode tokens.
3. Run with the following command:
    ``` bash
    docker-compose up
    ```

### 2. Live @ [https://meetby.onrender.com](https://meetby.onrender.com)
*It is deployed on the free-tier of [Render](https://render.com/). The free-tier put the deployment in idle after inactivity periods (~10/15 mins). For this reason, in the first access, you may experience some delays and you may need to wait a little or refresh the page few times.*