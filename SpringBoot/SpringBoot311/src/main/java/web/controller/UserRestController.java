package web.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.Model.Role;
import web.Model.User;
import web.service.UserServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/rest/admin")
public class UserRestController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping(value = "/")
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.saveUser(user);
        System.out.println(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/")
    public ResponseEntity<List<User>> getAll() {
        List<User> users = userService.listUser();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable(name = "id") int id) {
        User user = userService.getUserById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable(name = "id") int id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
