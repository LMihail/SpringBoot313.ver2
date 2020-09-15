package web.repository;

import org.springframework.data.repository.CrudRepository;
import web.Model.Role;

import java.util.Set;

public interface RoleRep extends CrudRepository<Role, Long> {
    public Set<Role> findAll();
}
