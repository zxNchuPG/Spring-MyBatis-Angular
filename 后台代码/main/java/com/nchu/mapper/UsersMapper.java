package com.nchu.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nchu.pojo.Users;

@Controller
@RequestMapping("/users")
public interface UsersMapper {
	void insertUser(Users users);

	List<Users> selcetUsersAll();

	Users selectUsersById(int id);
	
	void updateUsers(Users user);
	
	Integer deleteUserById(int id);
	
	List<Users> search(Users user);
	
	Integer delUserByIdList(@Param("idList")List<Integer> idList);
}
