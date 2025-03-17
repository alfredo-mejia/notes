package io.github.alfredomejia.jsbookserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @GetMapping("/ch1/1")
    public String ch1_1(@RequestParam(value = "name", defaultValue = "") String name) {
        if (name.isEmpty()) {
            return "Server cannot process empty name";
        }
        System.out.println("Received name: " + name);
        return "Received name: " + name;
    }

    @GetMapping("/ch1/2")
    public String ch1_2(@RequestParam(value = "time", defaultValue = "") String time) {
        if (time.isEmpty()) {
            return "Server cannot process empty time";
        }

        System.out.println("Received time: " + time);
        return "Received name: " + time;
    }
}
