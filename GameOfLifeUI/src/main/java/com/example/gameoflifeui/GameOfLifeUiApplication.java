package com.example.gameoflifeui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javafx.application.Application;

@SpringBootApplication
public class GameOfLifeUiApplication {

    public static void main(String[] args) {
        Application.launch(GameApplication.class, args);
    }

}
