package com.nchu.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nchu.mapper.UsersMapper;
import com.nchu.pojo.Users;
import com.nchu.service.UsersService;

@Service
@Transactional // 表示该类下所有方法都受事务控制
public class UsersServiceImpl implements UsersService {
	@Autowired
	private UsersMapper usersMapper;

	@Override
	public void addUser(Users users) {
		this.usersMapper.insertUser(users);
	}

	@Override
	public List<Users> findUsersAll() {
		return this.usersMapper.selcetUsersAll();
	}

	@Override
	public Users findUsersById(int id) {
		return this.usersMapper.selectUsersById(id);
	}

	@Override
	public void updateUsers(Users user) {
		this.usersMapper.updateUsers(user);
	}

	@Override
	public Integer deleteUserById(int id) {
		return this.usersMapper.deleteUserById(id);
	}

	@Override
	public List<Users> search(Users user) {
		return this.usersMapper.search(user);
	}

	@Override
	public Integer delUserByIdList(List<Integer> idList) {
		return this.usersMapper.delUserByIdList(idList);
	}

}
