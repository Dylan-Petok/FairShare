package com.fairshare.fairshare.dto;

import lombok.Data;
import java.util.List;

@Data
public class GroupDTO {
    private long groupID;
    private String groupName;
    private String groupDesc;
    private String pictureUrl;
    private List<String> usernames;
}