package org.example;

import com.google.gson.Gson;
import org.example.application.GameOfLife;
import org.example.services.GameOfLifeService;

import java.io.*;
import java.net.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {

    private static GameOfLifeService gameOfLifeService = new GameOfLifeService();

    public static void main(String[] args) {
        // Port number where the server will listen
        int port = 8080;

        // Thread pool for handling client requests concurrently
        ExecutorService threadPool = Executors.newFixedThreadPool(10);

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server is listening on port " + port);

            // Continuously listen for incoming connections
            while (true) {
                // Accept client connection
                Socket clientSocket = serverSocket.accept();
                System.out.println("New client connected");

                // Handle client request in a separate thread
                threadPool.execute(new ClientHandler(clientSocket, gameOfLifeService));
            }
        } catch (IOException e) {
            System.out.println("Server exception: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

// ClientHandler class to handle client requests
class ClientHandler implements Runnable {
    private final Socket clientSocket;
    private final GameOfLifeService gameOfLifeService;
    private final Gson gson = new Gson();

    public ClientHandler(Socket socket, GameOfLifeService gameOfLifeService) {
        this.clientSocket = socket;
        this.gameOfLifeService = gameOfLifeService;
    }

    @Override
    public void run() {
        try (
                // Set up streams to read from and write to the client
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)
        ) {
            // Read the client request
            String request = in.readLine();
            String message;
            if (request != null) {
                System.out.println("Request received: " + request);

                // Parse the request to get the endpoint (assuming GET request)
                String[] requestParts = request.split(" ");
                if (requestParts.length >= 2) {
                    String method = requestParts[0];
                    String endpoint = requestParts[1];

                    // Simple routing based on the endpoint
                    if (method.equals("GET")) {
                        switch (endpoint) {
                            case "/getState":
                                if (this.gameOfLifeService.isGameOfLifeCreated()) {
                                    GameOfLife gameOfLife = this.gameOfLifeService.getGameOfLife();
                                    respondJson(out, 200, gameOfLife);
                                } else {
                                    message = "Game of life does not exist -> please create a new game";
                                    respond(out, 404, message);
                                }
                        }
                    } else if (method.equals("PUT")) {
                        switch (endpoint) {
                            case "/startGameOfLife":
                                if (this.gameOfLifeService.isGameOfLifeCreated()) {
                                    // Run startGameOfLife in a separate thread
                                    new Thread(() -> this.gameOfLifeService.startGameOfLife()).start();
                                    message = "Game of life has been started";
                                    respond(out, 200, message);
                                } else {
                                    message = "Game of life does not exist -> please create a new game";
                                    respond(out, 404, message);
                                }
                                break;
                            case "/stopGameOfLife":
                                if (this.gameOfLifeService.isGameOfLifeCreated()) {
                                    this.gameOfLifeService.stopGameOfLife();
                                    message = "Game of life has been stopped";
                                    respond(out, 200, message);
                                } else {
                                    message = "Game of life does not exist -> please create a new game";
                                    respond(out, 404, message);
                                }
                                break;
                        }
                    } else if (method.equals("POST")) {
                        switch (endpoint) {
                            case "/createGameOfLife":
                                if (this.gameOfLifeService.isGameOfLifeCreated()) {
                                    message = "Game of life already exists";
                                    respond(out, 400, message);
                                } else {
                                    message = "Game of life created";
                                    this.gameOfLifeService.createGameOfLife();
                                    respond(out, 200, message);
                                }

                        }
                    } else {
                        respond(out, 405, "Method Not Allowed");
                    }
                }
            }

            // Close the connection with the client
            clientSocket.close();
        } catch (IOException e) {
            System.out.println("ClientHandler exception: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Respond to the client with an HTTP-like response
    private void respond(PrintWriter out, int statusCode, String message) {
        String statusText = (statusCode == 200) ? "OK" : (statusCode == 404) ? "Not Found" : "Method Not Allowed";

        out.println("HTTP/1.1 " + statusCode + " " + statusText);
        out.println("Content-Type: text/plain");
        out.println("Content-Length: " + message.length());
        out.println();
        out.println(message);
    }

    private void respondJson(PrintWriter out, int statusCode, Object responseObject) {
        String statusText = (statusCode == 200) ? "OK" : (statusCode == 404) ? "Not Found" : "Method Not Allowed";

        // Serialize the object to JSON
        String jsonResponse = gson.toJson(responseObject);

        out.println("HTTP/1.1 " + statusCode + " " + statusText);
        out.println("Content-Type: application/json");
        out.println("Content-Length: " + jsonResponse.length());
        out.println();
        out.println(jsonResponse);
    }
}
