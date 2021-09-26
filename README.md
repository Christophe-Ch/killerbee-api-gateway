# Killerbee API Gateway

API Gateway that provides JWT authentication and request redirection.

## :gear: Setup

- Copy `.env.example` and paste it as `.env`:

  ```sh
  cp ./.env.example ./.env
  ```

- In `.env`:

  - Set **JWT_SECRET** with your secret used to encode / decode JWT tokens
  - (Optional) Remove **NODE_TLS_REJECT_UNAUTHORIZED = "0"** if you are not using self-signed / invalid TLS certificates.

- Add your certificates to `./cert`

  - If you want to generate self-signed certificates, you can generate them using OpenSSL:

    ```sh
    openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out gateway-certificate.crt -keyout gateway.key
    ```

  - Certificate and key must respectively be called `gateway-certificate.crt` and `gateway.key`

## :rocket: Launch

### Manual launch

You can launch this project manually using

```sh
npm start
```

### Docker

This project is provided with a Dockerfile. If you want to deploy it as a Docker container, use the following commands:

```sh
docker build . -t killerbee-api-gateway
docker run -d -p 443:443 killerbee-api-gateway
```

### Docker Compose

This project can also be integrated into a Docker Compose environment using the following confguration:

```yaml
killerbee-api-gateway:
  build: path/to/project
```

or if you've already built the image:

```yaml
killerbee-api-gateway:
  image: killerbee-api-gateway
```

If you wish to expose port 443, add:

```yaml
killerbee-api-gateway:
  ...
  ports:
    - 443:443
```
