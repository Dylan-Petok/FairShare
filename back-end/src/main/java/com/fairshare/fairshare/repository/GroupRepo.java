package com.fairshare.fairshare.repository;

import com.fairshare.fairshare.model.Group;
import com.fairshare.fairshare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GroupRepo extends JpaRepository<Group, Long> {
    List<Group> findByGroupMembersContaining(User user);

    @Query("SELECT g.groupMembers FROM Group g WHERE g.groupID = :groupId")
    List<User> findGroupMembersByGroupId(Long groupId);
}