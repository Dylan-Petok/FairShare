package com.fairshare.fairshare.model;

import java.lang.annotation.Inherited;

import javax.annotation.processing.Generated;
import javax.persistence.*;


@Entity
public class Group {
    @ID 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long groupID;
    private String groupName;
    @Column(nullable = true)
    private String groupDesc;
    private Set<User> groupMembers = new HashSet<>();
    private Set<Expense> groupExpenses = new HashSet<>();
    @Column(nullable = true)
    private String groupPicUrl;


    public Group(String groupName, String groupDesc, String groupPicUrl, Set<User> groupMembers, Set<Expense> groupExpenses){
        this.groupName = groupName;
        this.groupDesc = groupDesc;
        this.groupPicUrl = groupPicUrl;
        this.groupMembers = users;
        this.expenses = expenses;
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
