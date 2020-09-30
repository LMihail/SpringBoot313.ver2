package web.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.Model.Role;
import web.Model.User;
import web.repository.RoleRep;
import web.repository.UserRep;

import java.util.*;

@Service
public class UserDaoImpl implements UserDao {

    @Autowired
    UserRep rep;
    @Autowired
    RoleRep roleRep;

    public void saveUser(User user) {
        Set<Role> roles = user.getRoles();
        if (roles == null) {
            roles = new HashSet<>();
            roles.add(roleRep.findById(1L).get());
            user.setRoles(roles);
        }
        rep.save(user);
    }

    public User getUserById(int id) {
        Optional<User> userFromDb = rep.findById(id);
        return userFromDb.orElse(new User());
    }

    public List<User> listUser() {
        return (List<User>) rep.findAll();
    }

    public User loadUserByUsername(String name) {
        return listUser().stream()
                .filter(a -> name.equals(a.getName()))
                .findFirst()
                .orElse(null);
    }

    public void delete(int id) {
        rep.deleteUserById(id);
    }

    public Set<Role> getAllRoles() {
        return roleRep.findAll();
    }
}
