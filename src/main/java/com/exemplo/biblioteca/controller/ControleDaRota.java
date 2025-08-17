package com.exemplo.biblioteca.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControleDaRota{

    @GetMapping("/")
    public String index() {
        return "index.html";
    }
}
