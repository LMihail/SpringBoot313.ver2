package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.ModelAndView;
import web.Model.Role;
import web.Model.User;

import web.service.UserServiceImpl;

import javax.servlet.http.HttpSession;
import java.util.List;


@Controller
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping(value = "/login")
    public String getLoginPage() {
        return "loginTest";
    }

    @GetMapping(value = "/admin")
    public ModelAndView allUsers() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin");
        modelAndView.addObject("users", userService.listUser());
        List<Role> allRoles = userService.getAllRoles();
        modelAndView.addObject("roles", allRoles);
        return modelAndView;
    }

    @PostMapping(value = "/delete")
    public String adminDeletePost(@RequestParam("id") int id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @GetMapping(value = "/edit")
    public String adminEditGet(ModelMap model, @RequestParam("id") int id) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);
        List<Role> roles = userService.getAllRoles();
        roles.forEach(role -> role.setInUser(user.isRoleInUser(role)));
        model.addAttribute("roles", roles);
        return "/edit";
    }

    @PostMapping(value = "/edit")
    public String adminEditPost(User user) {
        user.setRoles(userService.getUserById(user.getId()).getRoles());
        userService.saveUser(user);
        return "redirect:/admin";
    }

    //добавление
    @GetMapping(value = "/admin/add")
    public ModelAndView addUser() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("add");
        modelAndView.addObject("user", new User());
        return modelAndView;
    }

    @PostMapping(value = "/admin/add")
    public ModelAndView addUser(@ModelAttribute("user") User user) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("redirect:/admin");
        userService.saveUser(user);
        return modelAndView;
    }

    @GetMapping(value = "user")
    public String userGet(ModelMap modelMap, HttpSession httpSession) {
        modelMap.addAttribute("user", httpSession.getAttribute("user"));
        return "user";
    }
}
