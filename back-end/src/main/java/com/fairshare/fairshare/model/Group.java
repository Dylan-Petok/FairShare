package com.fairshare.fairshare.model;

import com.fairshare.fairshare.model.Expense;
import com.fairshare.fairshare.model.User;

import javax.annotation.processing.Generated;
import javax.persistence.*;

import java.util.Set;
import java.util.HashSet;


@Entity
@Table(name="groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long groupID;
    
    @Column(nullable = false)
    private String groupName;
    private String groupDesc;


    @ManyToMany
    @JoinTable(
        name = "group_members",
        joinColumns = @JoinColumn(name = "groupID"),
        inverseJoinColumns = @JoinColumn(name = "userID")
    )
    private Set<User> groupMembers = new HashSet<>();
    private Set<Expense> groupExpenses = new HashSet<>();
    private String groupPicUrl;

    public Group(){

    }

    public Group(String groupName, String groupDesc, String groupPicUrl, Set<User> groupMembers, Set<Expense> groupExpenses){
        this.groupName = groupName;
        this.groupDesc = groupDesc;
        this.groupPicUrl = groupPicUrl;
        this.groupMembers = groupMembers;
        this.groupExpenses = groupExpenses;
    }

    public long groupID(){
        return groupID;
    }

    public String getGroupName(){
        return groupName;
    }

    public void setGroupName(String groupName){
        this.groupName = groupName;
    }

    public String getGroupDesc(){
        return groupDesc;
    }

    public void setGroupDesc(String groupDesc){
        this.groupDesc = groupDesc;
    }

    public String getGroupPicUrl(){
        return groupPicUrl;
    }

    public void setGroupPicUrl(String groupPicUrl){
        this.groupPicUrl = groupPicUrl;
    }

    public Set<User> getGroupMembers(){
        return groupMembers;
    }

    public void setGroupMembers(Set<User> groupMembers){
        this.groupMembers = groupMembers;
    }

    public Set<Expense> getGroupExpenses(){
        return groupExpenses;
    }

    public void setGroupExpenses(Set<Expense> groupExpenses){
        this.groupExpenses = groupExpenses;
    }

}
