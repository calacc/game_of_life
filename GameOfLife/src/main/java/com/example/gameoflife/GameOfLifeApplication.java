package com.example.gameoflife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class GameOfLifeApplication {

    // Swaggger url: http://localhost:8080/swagger-ui/index.html#/
    public static void main(String[] args) {
        SpringApplication.run(GameOfLifeApplication.class, args);
    }

    @RestController
    public class HelloWorldController {

        @GetMapping("/test2")
        public String helloWorld() {
            return "HelloWorld";
        }
    }

}
