# Docker-Up

Deploy your docker container to a heroku instance in one line.

## Usage

```
docker-up
```

This will automatically run the following commands:

```
heroku create
heroku container:login
heroku container:push web -a APP_NAME
heroku container:release web -a APP_NAME
```

--------------

```
docker-up -u | --update
```

This will only run:

```
heroku container:login
heroku container:push web -a APP_NAME
heroku container:release web -a APP_NAME
```

## More Info

For more info read this blog post: [https://medium.com/@justkrup/deploy-a-docker-container-free-on-heroku-5c803d2fdeb1](https://medium.com/@justkrup/deploy-a-docker-container-free-on-heroku-5c803d2fdeb1
)
