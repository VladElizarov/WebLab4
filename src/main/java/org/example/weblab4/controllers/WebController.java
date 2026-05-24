package org.example.weblab4.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping({"/", "/login", "/home"})
    public String serveReact() {
        return "forward:/index.html";
    }
}
