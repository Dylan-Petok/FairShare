//declares the package that the class belongs to 
package com.fairshare.fairshare.repository;

//imports user class from model package
import com.fairshare.fairshare.model.User; 

//imports  'JpaRepository' interface from Spring Data JPA, which provides CRUD operations for entities
import org.springframework.data.jpa.repository.JpaRepository;

//imports '@Repository' interface which marks this interface as a spring data repository
import org.springframework.stereotype.Repository;

// marking this repo as a spring data repo
@Repository
public interface UserRepo extends JpaRepository<User, String> { 
    //defining interface extending jparepo
    //generic types user and long specify that this repo will manage 'User' entities and the primary key (ID) is type 'String'
    
    User findByuserName(String userName);

    void deleteByuserName(String userName);

    boolean existsByuserName(String userName);


}
