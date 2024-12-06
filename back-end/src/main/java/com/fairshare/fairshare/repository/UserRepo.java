//declares the package that the class belongs to 
package com.fairshare.fairshare.repository;

//imports user class from model package
import com.fairshare.fairshare.model.User; 

//imports  'JpaRepository' interface from Spring Data JPA, which provides CRUD operations for entities
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//imports '@Repository' interface which marks this interface as a spring data repository
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;


// marking this repo as a spring data repo
@Repository
public interface UserRepo extends JpaRepository<User, Long> { 
    //defining interface extending jparepo
    //generic types user and long specify that this repo will manage 'User' entities and the primary key (ID) is type 'String'
    
    User findByUserName(String userName);

    void deleteByUserName(String userName);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);


    @Query("SELECT u FROM User u WHERE LOWER(u.userName) LIKE LOWER(CONCAT('%', :query, '%')) AND u.userName NOT IN :excludeUsernames ORDER BY u.userName ASC")
    List<User> findTop3ByUserNameContainingIgnoreCaseAndNotIn(@Param("query") String query, @Param("excludeUsernames") List<String> excludeUsernames, Pageable pageable);
}
