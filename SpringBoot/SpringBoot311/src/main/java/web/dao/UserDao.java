package web.dao;

import org.springframework.stereotype.Service;
import web.Model.User;

import java.util.List;

@Service
public interface UserDao {

    public void saveUser(User user);

    public User getUserById(int id);

    public List<User> listUser();

    User loadUserByUsername(String s);
}
