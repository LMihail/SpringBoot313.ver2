package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.ModelAndView;
import web.Model.Role;

import web.Model.User;
import web.service.UserServiceImpl;

import java.util.List;


@Controller
@RequestMapping("/index")
public class AdminController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping
    public ModelAndView allUsers() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        modelAndView.addObject("users", userService.listUser());
        modelAndView.addObject("roles", userService.getAllRoles());
        modelAndView.addObject("user", new User());
        return modelAndView;
    }
}

