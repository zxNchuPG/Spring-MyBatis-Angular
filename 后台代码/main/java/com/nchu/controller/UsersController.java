package com.nchu.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nchu.pojo.Users;
import com.nchu.service.UsersService;

@Controller
@RequestMapping("/users")
public class UsersController {
	@Autowired
	private UsersService usersService;

	@RequestMapping("/")
	public String index() {
		return "input";
	}

	/**
	 * 页面跳转
	 */
	@RequestMapping("/{page}")
	public String showPage(@PathVariable String page) {
		return page;
	}

	/**
	 * 添加用户
	 */
	@ResponseBody
	@RequestMapping("/addUser")
	public Users addUser(@RequestBody Users users) {
		System.out.println("addUser调用");
		this.usersService.addUser(users);
		System.out.println(users);
		return users;
	}

	/**
	 * 查询全部用户
	 */
	@ResponseBody
	@RequestMapping("/findUsersAll")
	public List<Users> findUsersAll(Model model) {
		System.out.println("findUsersAll调用");
		List<Users> list = this.usersService.findUsersAll();
		// model.addAttribute("list",list);
		return list;
		// return "showUsers";
	}

	/**
	 * 根据id查找用户,需要回写，需要model对象
	 */
	@ResponseBody
	@RequestMapping("/findUsersById")
//	public String findUsersById(int id, Model model) {
	public Users findUsersById(Integer id) {
		System.out.println("findUsersById调用");
		Users user = this.usersService.findUsersById(id);
		System.out.println(user);
		return user;
	}

	/**
	 * 修改用户信息
	 */
	@ResponseBody
	@RequestMapping(value = "/editUsers",method = RequestMethod.POST,produces = "application/json;charset:utf-8")
	public Users editUsers(@RequestBody Users user) {
		System.out.println("editUsers被调用");
		System.out.println(user);
		this.usersService.updateUsers(user);
		return user;
	}

	/**
	 * 删除用户信息
	 */
	@ResponseBody
	@RequestMapping("/delUserById")
	public Map delUserById(int id) {
		System.out.println("删除用户被调用");
		Map<String,Integer> result = new HashMap<>();
		result.put("sum", this.usersService.deleteUserById(id));
		return result;
	}
	
	/**
	 *	批量删除用户信息 
	 */
	@ResponseBody
	@RequestMapping("/batchDelUser")
	public Map delUserByIdList(@RequestBody List<Users> list) {
		System.out.println("delUserByIdList接口调用");
		Map<String, Integer> result = new HashMap<>();
		List<Integer> idList = new ArrayList<>();
		for(Users user:list) {
			idList.add(user.getId());
		}
		result.put("sum", this.usersService.delUserByIdList(idList));
		return result;
	}
	/**
	 * 查找
	 */
	@ResponseBody
	@RequestMapping("/search")
	public List<Users> Search(@RequestBody Users users) {
		System.out.println("search接口调用");
		System.out.println("id:"+users.getId()+"  "+"name:"+users.getName()+"  "+"age:"+users.getAge());
		return this.usersService.search(users);
	}
}
