# meetby
Meetby is your meeting planning platform.

## Usage
There are two main possibilities:

### 1. Live @ [https://meetby.onrender.com](https://meetby.onrender.com)

### 2. Docker compose
1. Clone the repository
2. Create a `.env` file in the root directory with the following environment variables:
    - `JWT_SECRET_KEY`: the key used by JWT algorithms to encode and decode tokens.
3. Run with the following command:
    ``` bash
    docker-compose up
    ```
